import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import { Company} from "./company.model";
import {AddCompanyService} from "./add-company.service"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor(private addCompanyService : AddCompanyService, public dialogRef: MatDialogRef<AddCompanyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = new FormGroup ({
      companyRowId: new FormControl(),
      companyId: new FormControl(),
      companyName: new FormControl(),
      address: new FormControl(),
      contactPersonName: new FormControl(),
      contactPersonNumber: new FormControl(),
      department: new FormControl(),
      rowRecordStatus: new FormControl(),
      timestamp: new FormControl(),
    });

  }

  form: FormGroup;
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
      null,
      null,
      form.value.companyName,
      form.value.coyAddress ,
      form.value.contactPerson ,
      form.value.contactNumber ,
      form.value.department ,
      "valid" ,
      new Date()
    );

    console.log(newCompany)
    this.addCompanyService.insertCompany(newCompany).subscribe(
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

  save(){
    this.dialogRef.close(this.form.value);
  }

  cancel(){
    this.dialogRef.close();
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
