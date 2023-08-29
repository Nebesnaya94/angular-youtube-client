import { Component } from '@angular/core';
import { ItemsService } from '../../services/items-service.service';

@Component({
  selector: 'app-filtering-criteria',
  templateUrl: './filtering-criteria.component.html',
  styleUrls: ['./filtering-criteria.component.scss'],
})
export class FilteringCriteriaComponent {
  filterString = '';

  constructor(private itemsService: ItemsService) {}

  sortByDate() {
    this.itemsService.sortItemsByDate();
  }

  sortByCountOfViews() {
    this.itemsService.sortItemsByCountOfViews();
  }

  filterItemsByWord() {
    this.itemsService.filterWord$.next(this.filterString);
  }
}
