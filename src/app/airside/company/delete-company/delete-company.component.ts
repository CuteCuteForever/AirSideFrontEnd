import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { CompanyModel } from "./company.model";
import { DeleteCompanyService} from "./delete-company.service"
import {ConfirmDialogCompanyDeleteComponent } from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {TransponderModel} from "../../transponder/delete-transponder/transponder.model";

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent  implements OnInit {

  constructor(private deleteCompanyService : DeleteCompanyService , private dialog: MatDialog) { }

  companyArray:  CompanyModel[];
  companyNG : any;
  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  ngOnInit(): void {

    this.clearSuccessMessage()
    this.clearErrorMessage()

    this.deleteCompanyService.getCompany().subscribe( data => {
      this.companyArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });

  }

  onSubmit(form: NgForm) {

    this.clearErrorMessage()
    this.clearSuccessMessage()

    const confirmDialog = this.dialog.open(ConfirmDialogCompanyDeleteComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to remove company '+form.value.company.companyName+" ?"
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCompanyService.deleteCompany(this.companyNG).subscribe(
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
    });
  }

  onChangeCompanySelect(val : CompanyModel ){
    this.companyNG = val;
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
