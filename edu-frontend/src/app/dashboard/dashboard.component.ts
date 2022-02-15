import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student, StudentAttributes } from '../students/student';
import { StudentService } from '../students/student.service';
import { TeacherAttributes, Teacher } from '../teachers/teacher';
import { TeacherService } from '../teachers/teacher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('createStudentModalCloseBtn') createStudentModalCloseBtn: ElementRef | undefined;
  @ViewChild('createTeacherModalCloseBtn') createTeacherModalCloseBtn: ElementRef | undefined;

  showAlert: boolean = false;
  isSuccessfullAlert: boolean = false;
  alertMessage: string = "";

  studentCreationForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    regNumber: new FormControl(null, Validators.required),
    grade: new FormControl(null)
  });

  teacherCreationForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    regNumber: new FormControl(null, Validators.required)
  });

  constructor(private studentService: StudentService, private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

  onStudentFormSubmit() {
    if (this.studentCreationForm.valid) {
      this.createStudentModalCloseBtn?.nativeElement.click();
      var studentAttributes: StudentAttributes = {
        regNumber: this.studentCreationForm.value.regNumber,
        grade: this.studentCreationForm.value.grade
      }
      var student: Student = {
        firstName: this.studentCreationForm.value.firstName,
        lastName: this.studentCreationForm.value.lastName,
        email: this.studentCreationForm.value.email,
        attributes: studentAttributes
      };
      this.studentService.createStudent(student).subscribe({
        next: async (response) => {
          this.clearStudentCreationForm();
          this.showAlertMessage("User created successfully!!!", true);
        },
        error: (error) => {
          this.clearStudentCreationForm();
          this.showAlertMessage("An error occurred while the user is created!!!", false);
        }
      });
    }
    else {
      console.log(this.studentCreationForm.errors);
    }
  }

  onTeacherFormSubmit() {
    if (this.teacherCreationForm.valid) {
      this.createTeacherModalCloseBtn?.nativeElement.click();
      var teacherAttributes: TeacherAttributes = {
        regNumber: this.teacherCreationForm.value.regNumber
      }
      var teacher: Teacher = {
        firstName: this.teacherCreationForm.value.firstName,
        lastName: this.teacherCreationForm.value.lastName,
        email: this.teacherCreationForm.value.email,
        attributes: teacherAttributes
      };
      this.teacherService.createTeacher(teacher).subscribe({
        next: async (response) => {
          this.clearTeacherCreationForm();
          this.showAlertMessage("User created successfully!!!", true);
        },
        error: (error) => {
          this.clearTeacherCreationForm();
          this.showAlertMessage("An error occurred while the user is created!!!", false);
        }
      });
    }
    else {
      console.log(this.teacherCreationForm.errors);
    }
  }

  clearStudentCreationForm() {
    this.studentCreationForm.reset();
  }

  clearTeacherCreationForm() {
    this.teacherCreationForm.reset();
  }

  showAlertMessage(message: string, isSuccess: boolean) {
    this.alertMessage = message;
    this.showAlert = true;
    this.isSuccessfullAlert = isSuccess
    this.hideAlertMessage();
  }

  hideAlertMessage() {
    setTimeout(() => {
      this.alertMessage = "";
      this.showAlert = false;
    }, 3000);
  }
}
