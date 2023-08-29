import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from 'src/app/redux/state.models';

@Pipe({
  name: 'filterByWord',
})
export class FilterByWordPipe implements PipeTransform {
  transform(items: ICard[], value: string) {
    return items.filter((item) => item.title.includes(value));
  }
}
