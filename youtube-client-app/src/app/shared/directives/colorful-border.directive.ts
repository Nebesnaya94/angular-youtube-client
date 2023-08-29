import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appColorfulBorder]',
})
export class ColorfulBorderDirective implements OnChanges {
  @Input() itemDate: string;

  dateDif = 0;

  color = '#3f51b5';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnChanges() {
    this.checkDate();
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.color
    );
  }

  private checkDate() {
    this.dateDif = Math.floor(
      Math.abs(Date.now() - Date.parse(this.itemDate)) / (1000 * 3600 * 24)
    );
    if (this.dateDif < 7) {
      this.color = 'blue';
    } else if (this.dateDif >= 7 && this.dateDif <= 30) {
      this.color = 'green';
    } else if (this.dateDif / 30 > 1 && this.dateDif / 30 < 6) {
      this.color = 'yellow';
    } else {
      this.color = 'red';
    }
  }
}
