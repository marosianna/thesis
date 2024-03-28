import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Medical Blood Test System';
}
