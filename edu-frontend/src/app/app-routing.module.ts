import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AppAuthGuard } from './utils/keycloak/app.authguard';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AppAuthGuard], 
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AppAuthGuard], 
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
