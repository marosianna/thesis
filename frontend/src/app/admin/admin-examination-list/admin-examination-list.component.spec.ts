import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExaminationListComponent } from './admin-examination-list.component';

describe('AdminExaminationListComponent', () => {
  let component: AdminExaminationListComponent;
  let fixture: ComponentFixture<AdminExaminationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExaminationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExaminationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
