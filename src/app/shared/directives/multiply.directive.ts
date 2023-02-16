import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appMultiply]',
  standalone: true,
})
export class MultiplyByDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('multiplyBy') factor!: number; // Input for the factor to multiply by

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const value = parseFloat(this.el.nativeElement.innerHtml);
    console.log(this.el.nativeElement); // Get the element value as a number
    if (!isNaN(value)) {
      const result = value * this.factor; // Multiply the value by the factor
      this.renderer.setProperty(this.el.nativeElement, 'innerText', result); // Update the element value
    }
  }
}
