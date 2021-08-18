import {Component, Inject, OnInit} from '@angular/core';
import {CompanyModel} from "./company.model";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import { UpdateCompanyService } from "./update-company.service"
import {json} from "ng2-validation/dist/json";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent  implements OnInit {

  form: FormGroup;

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

  constructor(private fb: FormBuilder , private companyService : UpdateCompanyService , public dialogRef: MatDialogRef<UpdateCompanyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.company = data.companyData;
    console.log(this.company)

    this.form = new FormGroup ({
      companyRowId: new FormControl(this.company.companyRowId),
      companyId: new FormControl(this.company.companyId),
      companyName: new FormControl(this.company.companyName),
      address: new FormControl(this.company.address),
      contactPersonName: new FormControl(this.company.contactPersonName),
      contactPersonNumber: new FormControl(this.company.contactPersonNumber),
      department: new FormControl(this.company.department),
      rowRecordStatus: new FormControl(this.company.rowRecordStatus),
      timestamp: new FormControl(this.company.timestamp),
    });

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


  onSubmit(form: NgForm) {

   /* this.clearErrorMessage();
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
*/
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

  save(){
    this.dialogRef.close(this.form.value);
  }

  Cancel(){
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
