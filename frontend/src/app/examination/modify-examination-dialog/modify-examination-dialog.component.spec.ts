import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExaminationDialogComponent } from './modify-examination-dialog.component';

describe('ModifyExaminationDialogComponent', () => {
  let component: ModifyExaminationDialogComponent;
  let fixture: ComponentFixture<ModifyExaminationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyExaminationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
