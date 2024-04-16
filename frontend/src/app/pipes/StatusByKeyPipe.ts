import { Pipe, PipeTransform } from '@angular/core';
import { ExaminationStatus } from '../models/ExaminationStatus';

@Pipe({
  name: 'enumValueByKeyStatus'
})
export class StatusByKeyPipe implements PipeTransform {
    transform(key: any): any {
        return Object.values(ExaminationStatus)[Object.keys(ExaminationStatus).indexOf(key)];
      }
}