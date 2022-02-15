import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Teacher } from './teacher';
import { Constants } from '../utils/constants';
import { KeyCloakGroup } from '../utils/keycloak/defs/keycloakGroup';
import { ServiceUrls } from '../utils/service-urls';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  groupId: string | undefined

  constructor(private http: HttpClient) {
    this.getTeacherGroupInfo().subscribe({
      next: (response: [KeyCloakGroup]) => {
        let teacherGroup = response.find(el => el.name == Constants.GROUPS['Teacher']);
        if (teacherGroup) {
          this.groupId = teacherGroup.id
        }
      }
    });
  }

  getTeacherGroupInfo(): Observable<any> {
    return this.http.get(`${ServiceUrls.GROUPS}?search=`).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  createTeacher(teacher: Teacher): Observable<any> {
    return this.http.post(ServiceUrls.TEACHERS, teacher).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  updateTeacher(teacher: Teacher, id: string): Observable<any> {
    return this.http.put(ServiceUrls.TEACHERS + `/${id}`, teacher).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }


  viewTeacherById(id: string): Observable<any> {
    return this.http.get(ServiceUrls.TEACHERS + `/${id}`).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  viewTeachers(): Observable<any> {
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
      return throwError(() => new Error("Teacher group ID is missing"));
    }
  }
}
