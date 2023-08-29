import { Component, Input } from '@angular/core';
import { ICard } from 'src/app/redux/state.models';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() searchItem: ICard;
}
