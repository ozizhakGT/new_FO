import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(value: any, propname: string): any {
    return value.sort((a, b) => {
      if (new Date(a[propname]) < b[propname]) {
        return 1;
      }
      else if (a[propname] > b[propname]) {
        return -1;
      }
      else {
        return 0;
      }
    });
  }

}
