import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICard } from 'src/app/redux/state.models';

@Injectable()
export class ItemsService {
  private sortDateValue = false;
  private sortViewValue = false;

  cards: ICard[] = [];

  cards$: BehaviorSubject<ICard[]> = new BehaviorSubject<ICard[]>([]);

  filterWord$: BehaviorSubject<string> = new BehaviorSubject('');

  prepareItemsData() {
    this.cards$.next([...this.cards]);
  }

  sortItemsByDate() {
    this.sortDateValue = !this.sortDateValue;
    this.cards.sort((a: ICard, b: ICard) => {
      const c =
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();

      return this.sortDateValue ? c : -c;
    });
    this.prepareItemsData();
  }

  sortItemsByCountOfViews() {
    this.sortViewValue = !this.sortViewValue;
    this.cards.sort((a: ICard, b: ICard) => {
      const c = +a.statistics.viewCount - +b.statistics.viewCount;

      return this.sortViewValue ? c : -c;
    });
    this.prepareItemsData();
  }
}
