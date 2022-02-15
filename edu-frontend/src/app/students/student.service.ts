import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Constants } from '../utils/constants';
import { KeyCloakGroup } from '../utils/keycloak/defs/keycloakGroup';
import { ServiceUrls } from '../utils/service-urls';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  groupId: string | undefined

  constructor(private http: HttpClient) {
    this.getStudentGroupInfo().subscribe({
      next: (response: [KeyCloakGroup]) => {
        let studentGroup = response.find(el => el.name == Constants.GROUPS['Student']);
        if (studentGroup) {
          this.groupId = studentGroup.id
        }
      }
    });
  }

  getStudentGroupInfo(): Observable<any> {
    return this.http.get(`${ServiceUrls.GROUPS}?search=`).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  createStudent(student: Student): Observable<any> {
    return this.http.post(ServiceUrls.STUDENTS, student).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  updateStudent(student: Student, id: string): Observable<any> {
    return this.http.put(ServiceUrls.STUDENTS + `/${id}`, student).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  viewStudentById(id: string): Observable<any> {
    return this.http.get(ServiceUrls.STUDENTS + `/${id}`).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  viewStudents(): Observable<any> {
    if (this.groupId) {
      return this.http.get(ServiceUrls.GROUP_MEMBERS + `/${this.groupId}`).pipe(
        map(response => {
          return response
        }),
        catchError(error => {
          return throwError(() => error)
        })
      );
    }
    else {
      return throwError(() => new Error("Student group ID is missing"));
    }
  }
}
