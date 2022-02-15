import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { AddEditStudentsComponent } from './add-edit-students/add-edit-students.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewStudentsComponent,
    AddEditStudentsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
