import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAttributes, Student } from 'src/app/students/student';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-edit-teachers',
  templateUrl: './add-edit-teachers.component.html',
  styleUrls: ['./add-edit-teachers.component.css']
})
export class AddEditTeachersComponent implements OnInit {

  showAlert: boolean = false;
  isSuccessfullAlert: boolean = false;
  alertMessage: string = "";
  userId: string | undefined

  teacherUpdateForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl({value: null, disabled: true}, [Validators.required, Validators.email])
  });

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.userId = params['id']
          this.teacherService.viewTeacherById(params['id']).subscribe({
            next: (response) => {
              this.teacherUpdateForm.controls['firstName'].setValue(response.firstName);
              this.teacherUpdateForm.controls['lastName'].setValue(response.lastName);
              this.teacherUpdateForm.controls['email'].setValue(response.email);
            },
            error: (error) => {

            }
          });
        }
      }
    });
  }

  onTeacherFormSubmit() {
    if (this.teacherUpdateForm.valid) {
      var teacher: Teacher = {
        firstName: this.teacherUpdateForm.value.firstName,
        lastName: this.teacherUpdateForm.value.lastName,
        email: this.teacherUpdateForm.value.email
      };
      if (this.userId) {
        this.teacherService.updateTeacher(teacher, this.userId).subscribe({
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
      console.log(this.teacherUpdateForm.errors);
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
