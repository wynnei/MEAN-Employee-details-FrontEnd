import { Injectable } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import{throwError,catchError} from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
// creating an instance of FormBuider object/inject
  constructor(private fb:FormBuilder, private http: HttpClient) { }
  readonly baseURL='https://mean-employee-details-backend.onrender.com/api/v1/';
  list:Employee[]=[]
  // pass validation rules
  //intance of the FormBulder object as employeeForm
  employeeForm = this.fb.group({
    _id:[''],
    fullName:['',Validators.required],
    position:['',Validators.required],
    location:[''],
    salary:['',Validators.required],
  })
  
//making a post request to node.js server API
  postEmployee(){
    return this.http.post(this.baseURL,this.employeeForm.value).pipe(catchError(this.handleError))
  }

  fetchEmployeeList(){
    this.http.get(this.baseURL).pipe(catchError(this.handleError)).subscribe(data=>{
      this.list=data as Employee[]
    })
  }

  patchEmployee(){
    return this.http.patch(this.baseURL+ this.employeeForm.get('_id')?.value,this.employeeForm.value).pipe(catchError(this.handleError))
  }

  deleteEmployee(_id:string){
    return this.http.delete(this.baseURL+ _id).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
