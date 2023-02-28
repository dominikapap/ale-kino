import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: 'input[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  @Input() inputLength?: number;
  private el = inject(ElementRef);

  @HostListener('input', ['$event']) onInputChange() {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue
      .replace(/[^0-9]*/g, '')
      .slice(0, this.inputLength);
  }
}
