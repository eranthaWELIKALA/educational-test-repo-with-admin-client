import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from '../utils/keycloak/app.authguard';
import { AddEditStudentsComponent } from './add-edit-students/add-edit-students.component';
import { ViewStudentsComponent } from './view-students/view-students.component';

const routes: Routes = [
  {
    path: "",
    component: ViewStudentsComponent,
    canActivate: [AppAuthGuard],
  },
  {
    path: ':id',
    component: AddEditStudentsComponent,
    canActivate: [AppAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
