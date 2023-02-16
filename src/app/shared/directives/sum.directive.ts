import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { sum } from '../pipes/utils';

@Directive({
  selector: '[appSum]',
  standalone: true,
})
export class SumDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const value = parseFloat(this.el.nativeElement);
    console.log(value);
    // Get the element value as a number
    if (value) {
      const result = sum([value]);
      this.renderer.setProperty(this.el.nativeElement, 'innerText', result); // Update the element value
    }
  }
}
