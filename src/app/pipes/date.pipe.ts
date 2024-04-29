import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datemod'
})
export class DatemodPipe implements PipeTransform {

  transform(value: string, separator?: string): string {
    if(!separator) separator = '-';
    return `${value.split('-')[2]}${separator}${value.split('-')[1]}${separator}${value.split('-')[0]}`;
  }

}
