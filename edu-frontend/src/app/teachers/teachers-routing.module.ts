import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from '../utils/keycloak/app.authguard';
import { AddEditTeachersComponent } from './add-edit-teachers/add-edit-teachers.component';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';

const routes: Routes = [
  {
    path: "",
    component: ViewTeachersComponent,
    canActivate: [AppAuthGuard],
  },
  {
    path: ':id',
    component: AddEditTeachersComponent,
    canActivate: [AppAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
