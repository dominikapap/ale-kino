import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avg',
})
export class AveragePipe implements PipeTransform {
  transform(values: any) {
    const numSum = this.sum(values);
    return numSum / values.length;
  }

  sum(input: Array<number>, initial = 0): number {
    return input.reduce(
      (previous: number, current: number) => previous + current,
      initial
    );
  }
}
