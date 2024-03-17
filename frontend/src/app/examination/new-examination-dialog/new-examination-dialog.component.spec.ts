import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExaminationDialogComponent } from './new-examination-dialog.component';

describe('NewExaminationDialogComponent', () => {
  let component: NewExaminationDialogComponent;
  let fixture: ComponentFixture<NewExaminationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExaminationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
