import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExaminationDialogComponent } from './delete-examination-dialog.component';

describe('DeleteExaminationDialogComponent', () => {
  let component: DeleteExaminationDialogComponent;
  let fixture: ComponentFixture<DeleteExaminationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExaminationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
