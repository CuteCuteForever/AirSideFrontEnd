import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Company} from "./company.model";
import { companyService } from "./add-company.service"

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor(private companyService : companyService) { }

  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    this.clearErrorMessage()
    this.clearSuccessMessage()

    const newCompany : Company = new Company(
      form.value.companyName,
      form.value.coyAddress ,
      form.value.contactPerson ,
      form.value.contactNumber ,
      form.value.department ,
      "valid" ,
      new Date()
    );


    this.companyService.insertCompany(newCompany).subscribe(
      (data : any) => {
        this.setSuccessMessage(data.message)
        form.reset();
      },
      (error : any) => {
        if (error.error.message) {
          this.setErrorMessage(error.error.message)
        }
      }
    );

  }

  clearErrorMessage(){
    this.isError = false;
    this.errorMessage = "";
  }

  setErrorMessage(errorMessage : string) {
    this.isError = true;
    this.errorMessage = errorMessage;
  }

  setSuccessMessage(successMessage : string) {
    this.isSuccessful = true;
    this.successMessage = successMessage;
  }

  clearSuccessMessage() {
    this.isSuccessful = true;
    this.successMessage = "";
  }


}
