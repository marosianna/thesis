import { Pipe, PipeTransform } from '@angular/core';
import { ExaminationType } from '../models/ExaminationType';

@Pipe({
  name: 'enumValueByKeyType'
})
export class TypeByKeyPipe implements PipeTransform {
    transform(key: any): any {
        return Object.values(ExaminationType)[Object.keys(ExaminationType).indexOf(key)];
      }
}