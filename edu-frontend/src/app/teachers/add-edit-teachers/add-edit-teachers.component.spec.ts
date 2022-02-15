import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeachersComponent } from './add-edit-teachers.component';

describe('AddEditTeachersComponent', () => {
  let component: AddEditTeachersComponent;
  let fixture: ComponentFixture<AddEditTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
