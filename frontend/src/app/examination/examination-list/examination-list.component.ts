import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Examination } from 'src/app/models/Examination';
import { ExaminationService } from 'src/app/services/examination.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss']
})
export class ExaminationListComponent implements OnInit{

  examinations: Examination [] = [];

  constructor(private examinationService: ExaminationService,
              private userService: UserService,
              private router: Router){}

  ngOnInit(): void {
   this.loadExaminations();
  }

  loadExaminations(): void {

    this.examinationService.getAllByUser().subscribe((res) => this.examinations = res);

    /*if (this.userService.isUserLoggedIn()) { // Assume authService.isLoggedIn() checks if user is logged in
      this.examinationService.getAllByUser().subscribe(
        (response: any) => {
          this.examinations = response;
        },
        (error: any) => {
          // Handle authentication error
          console.error("Authentication error:", error);
          // Redirect user to login page or show error message
        }
      );
    } else {
      // Handle case when user is not logged in
      console.error("User is not logged in.");
      // Redirect user to login page or show error message
    }
  }*/
  }
}
