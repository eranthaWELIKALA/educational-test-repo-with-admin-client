import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit {

  teachers: [Teacher] | undefined

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadAllTeachers();
    }, 2000);
  }

  loadAllTeachers() {
    this.teacherService.viewTeachers().subscribe({
      next: (response: [Teacher]) => {
        this.teachers = response;
      },
      error: (error) => {
      }
    });
  }

}
