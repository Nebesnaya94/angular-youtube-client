import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, IUser } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  user: IUser;

  isAuthorized: boolean;

  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
        ),
      ]),
    });
    this.user = this.authService.getUser();
    this.isAuthorized = !!this.user;
    if (this.user) {
      this.form.patchValue({
        emailControl: this.user.name,
        passwordControl: this.user.password,
      });
      this.form.disable();
    }
  }

  logIn() {
    this.user = {
      name: this.form.value.emailControl,
      password: this.form.value.passwordControl,
    };
    this.form.disable();
    this.authService.login(this.user.name, this.user.password);
    this.isAuthorized = true;
    this.router.navigate(['/main']);
  }

  logOut() {
    this.form.reset();
    this.form.enable();
    this.authService.logout();
    this.isAuthorized = false;
  }
}
