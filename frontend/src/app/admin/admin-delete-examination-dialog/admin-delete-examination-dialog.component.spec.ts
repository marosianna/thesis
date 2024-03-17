import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteExaminationDialogComponent } from './admin-delete-examination-dialog.component';

describe('AdminDeleteExaminationDialogComponent', () => {
  let component: AdminDeleteExaminationDialogComponent;
  let fixture: ComponentFixture<AdminDeleteExaminationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteExaminationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDeleteExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
