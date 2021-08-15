import { Component, OnInit } from '@angular/core';
import {CompanyModel} from "./company.model";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import { companyService } from "./update-company.service"
import {json} from "ng2-validation/dist/json";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent  implements OnInit {

  constructor(private companyService : companyService) { }

  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  companyArray:  CompanyModel[];

  company : CompanyModel;

  companyRowIdNG : any
  companyIdNG : any
  companyNameNG : any;
  addressNG : any;
  contactPersonNG : any;
  contactNumberNG : any;
  departmentNG : any;

  onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    const newCompany : CompanyModel = new CompanyModel(
      this.companyRowIdNG,
      this.companyIdNG,
      this.companyNameNG,
      this.addressNG,
      this.contactPersonNG ,
      this.contactNumberNG ,
      this.departmentNG ,
      "valid" ,
      new Date()
    );

    console.log(newCompany);

    this.companyService.updateCompany(newCompany).subscribe(
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

  ngOnInit() {

    this.clearSuccessMessage()
    this.clearErrorMessage()

    this.companyService.getCompany().subscribe( data => {
      this.companyArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });
  }

  onChangeCompanySelect(val : any ){
    this.companyRowIdNG = (val.companyRowId)
    this.companyIdNG = (val.companyId)
    this.addressNG = (val.address)
    this.companyNameNG = (val.companyName)
    this.contactPersonNG = (val.contactPersonName)
    this.contactNumberNG = (val.contactPersonNumber)
    this.departmentNG = (val.department)
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
