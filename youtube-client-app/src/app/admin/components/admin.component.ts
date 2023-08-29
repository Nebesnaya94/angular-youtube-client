import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppState, ICard } from 'src/app/redux/state.models';
import { nanoid } from 'nanoid';
import { Store } from '@ngrx/store';
import { addCreatedCard } from 'src/app/redux/actions/card.actions';
import { dateValidator } from '../validators/date-validator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  form: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.form = new FormGroup({
      titleControl: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      descriptionControl: new FormControl('', [Validators.maxLength(255)]),
      coverImageLinkControl: new FormControl('', [
        Validators.required,
        Validators.pattern('(http|https)://.+'),
      ]),
      videoLinkControl: new FormControl('', [
        Validators.required,
        Validators.pattern('(http|https)://.+'),
      ]),
      creationDateControl: new FormControl('', [
        Validators.required,
        dateValidator,
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      const card: ICard = {
        id: nanoid(),
        title: formData.titleControl,
        description: formData.descriptionControl,
        imageLink: formData.coverImageLinkControl,
        videoLink: formData.videoLinkControl,
        creationDate: formData.creationDateControl,
        statistics: {
          viewCount: '0',
          likeCount: '0',
          favoriteCount: '0',
          commentCount: '0',
        },
      };

      this.store.dispatch(addCreatedCard({ card }));
      this.resetForm(this.form);
    }
  }

  private resetForm(form: FormGroup) {
    form.reset();
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.setErrors(null);
      }
    });
  }
}
