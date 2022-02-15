import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {

  students: [Student] | undefined

  constructor(private studentService: StudentService, private keycloak: KeycloakService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadAllStudents();
    }, 2000);
  }

  loadAllStudents() {
    this.studentService.viewStudents().subscribe({
      next: (response: [Student]) => {
        this.students = response;
      },
      error: (error) => {
      }
    });
  }

}
