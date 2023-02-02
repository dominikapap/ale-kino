/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { isArray, sum } from './utils';


@Pipe({ name: 'sum', standalone: true })
export default class SumPipe implements PipeTransform {
  transform(input: any): any {
    return !isArray(input) ? input : sum(input);
  }

  // sum(input: Array<number>, initial = 0): number {
  //   return input.reduce(
  //     (previous: number, current: number) => previous + current,
  //     initial
  //   );
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // isArray(value: any): boolean {
  //   return Array.isArray(value);
  // }
}
