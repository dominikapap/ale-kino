import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sum', standalone: true })
export default class SumPipe implements PipeTransform {
  transform(input: any): any {
    return !this.isArray(input) ? input : this.sum(input);
  }

  sum(input: Array<number>, initial = 0): number {
    return input.reduce(
      (previous: number, current: number) => previous + current,
      initial
    );
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
