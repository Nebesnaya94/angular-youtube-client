import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/core/services/items-service.service';
import { Subscription } from 'rxjs';
import { ICard } from 'src/app/redux/state.models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  detailsItem: ICard;

  private id: string;

  private routerParams: Subscription;

  constructor(
    public router: ActivatedRoute,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    const prm = this.router.params;
    this.routerParams = prm.subscribe((params) => {
      this.id = params['id'];
      this.detailsItem = this.itemsService.cards.find(
        (item) => item.id === this.id
      ) as ICard;
    });
  }

  ngOnDestroy() {
    this.routerParams.unsubscribe();
  }
}
