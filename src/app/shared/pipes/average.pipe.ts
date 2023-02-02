import { Pipe, PipeTransform } from '@angular/core';
import { sum } from './utils';

@Pipe({
  name: 'avg',
})
export class AveragePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(values: any) {
    const numSum = sum(values);
    return numSum / values.length;
  }
}
