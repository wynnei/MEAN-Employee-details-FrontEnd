import { Component } from '@angular/core';
import {EmployeeService} from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  //checks if form in submitted or not
  submitted:boolean=false
  //inject employeeService class
  constructor(public service:EmployeeService ,private toastr:ToastrService){}

  onSubmit(){
    this.submitted=true
    if(this.service.employeeForm.valid)
    {
      if(this.service.employeeForm.get('_id')?.value=='')
      // post method is returning an observable which needs to be submitted
      this.service.postEmployee().subscribe(res=>{
        this.service.fetchEmployeeList()
        this.toastr.success('Created successfully','Employee Register')
        this.resetForm()
        
      })
      else{
        this.service.patchEmployee().subscribe(res=>{
          this.service.fetchEmployeeList()
          this.toastr.info('Updated successfully','Employee Register')
          this.resetForm()
          
        })
      }
    }
    
  }
//using FormBuider object to reset form
  resetForm(){
    this.service.employeeForm.reset()
    this.submitted = false
  }

}
