import { Pipe, PipeTransform } from '@angular/core';
import { TimeSlot } from '../models/TimeSlot';

@Pipe({
  name: 'enumValueByKey'
})
export class EnumValueByKeyPipe implements PipeTransform {
    transform(key: any): any {
        return Object.values(TimeSlot)[Object.keys(TimeSlot).indexOf(key)];
      }
}