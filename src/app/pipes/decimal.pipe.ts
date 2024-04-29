import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: string): string {
    const fixedValue: string = Number(value).toFixed(2);
    const newValue: string = fixedValue.replace('.', ',');
    return newValue;
  }

}
