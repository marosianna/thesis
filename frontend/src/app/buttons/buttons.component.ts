import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  //@Output() loginEvent = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();

  @Output() adminLoginEvent = new EventEmitter();
  @Output() userLoginEvent = new EventEmitter();
}
