import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/core/services/items-service.service';
import { Subscription } from 'rxjs';
import { AppState, ICard } from 'src/app/redux/state.models';
import { Store } from '@ngrx/store';
import { selectAllCards } from 'src/app/redux/selectors/card.selector';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchItems: ICard[] = [];
  filterWord = '';

  subscriptionStore: Subscription;
  subscriptionCards: Subscription;
  subscriptionWord: Subscription;
  subscriptions: Subscription[] = [];

  storeCards$ = this.store.select(selectAllCards);

  constructor(
    private itemsService: ItemsService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const allCards = this.itemsService.cards$;
    this.subscriptionCards = allCards.subscribe((cards) => {
      this.searchItems = cards;
    });
    const storeItems = this.storeCards$;
    this.subscriptionStore = storeItems.subscribe((items) => {
      this.itemsService.cards = items;
      this.itemsService.prepareItemsData();
    });
    const filterWord = this.itemsService.filterWord$;
    this.subscriptionWord = filterWord.subscribe((word) => {
      this.filterWord = word;
    });
    this.subscriptions.push(
      this.subscriptionCards,
      this.subscriptionStore,
      this.subscriptionWord
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
