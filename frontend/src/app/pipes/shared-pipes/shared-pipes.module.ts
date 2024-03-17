import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumValueByKeyPipe } from '../EnumValueByKeyPipe';
import { TypeByKeyPipe } from '../TypeByKeyPipe';
import { StatusByKeyPipe } from '../StatusByKeyPipe';



@NgModule({
  declarations: [
    EnumValueByKeyPipe,
    TypeByKeyPipe,
    StatusByKeyPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EnumValueByKeyPipe,
    TypeByKeyPipe,
    StatusByKeyPipe,
  ]
})
export class SharedPipesModule { }
