import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewExaminationDialogComponent } from './admin-new-examination-dialog.component';

describe('AdminNewExaminationDialogComponent', () => {
  let component: AdminNewExaminationDialogComponent;
  let fixture: ComponentFixture<AdminNewExaminationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewExaminationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
