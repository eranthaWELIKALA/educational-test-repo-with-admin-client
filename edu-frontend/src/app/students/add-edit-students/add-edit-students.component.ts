import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAttributes, Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-edit-students',
  templateUrl: './add-edit-students.component.html',
  styleUrls: ['./add-edit-students.component.css']
})
export class AddEditStudentsComponent implements OnInit {

  showAlert: boolean = false;
  isSuccessfullAlert: boolean = false;
  alertMessage: string = "";
  userId: string | undefined

  studentUpdateForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl({value: null, disabled: true} , [Validators.required, Validators.email])
  });

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.userId = params['id']
          this.studentService.viewStudentById(params['id']).subscribe({
            next: (response) => {
              this.studentUpdateForm.controls['firstName'].setValue(response.firstName);
              this.studentUpdateForm.controls['lastName'].setValue(response.lastName);
              this.studentUpdateForm.controls['email'].setValue(response.email);
            },
            error: (error) => {

            }
          });
        }
      }
    });
  }

  onStudentFormSubmit() {
    if (this.studentUpdateForm.valid) {
      var student: Student = {
        firstName: this.studentUpdateForm.value.firstName,
        lastName: this.studentUpdateForm.value.lastName,
        email: this.studentUpdateForm.value.email
      };
      if (this.userId) {
        this.studentService.updateStudent(student, this.userId).subscribe({
          next: (response) => {
            this.showAlertMessage("User updated successfully!!!", true);
          },
          error: (error) => {
            this.showAlertMessage("An error occurred while the user is updated!!!", false);
          }
        });
      }
    }
    else {
      console.log(this.studentUpdateForm.errors);
    }
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
