import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { AddEditTeachersComponent } from './add-edit-teachers/add-edit-teachers.component';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddEditTeachersComponent,
    ViewTeachersComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
