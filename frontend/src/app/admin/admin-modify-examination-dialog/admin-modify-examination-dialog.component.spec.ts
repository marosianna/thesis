import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyExaminationDialogComponent } from './admin-modify-examination-dialog.component';

describe('AdminModifyExaminationDialogComponent', () => {
  let component: AdminModifyExaminationDialogComponent;
  let fixture: ComponentFixture<AdminModifyExaminationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifyExaminationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModifyExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
