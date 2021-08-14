import { Component, OnInit } from '@angular/core';
import {DeleteVehicleService} from "./delete-vehicle.service";
import {CompanyModel} from "../update-vehicle/company.model";
import {VehicleModel} from "../update-vehicle/vehicle.model";
import {NgForm} from "@angular/forms";
import {ConfirmDialogVehicleDeleteComponent} from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css']
})
export class DeleteVehicleComponent implements OnInit {

  constructor(private deleteVehicleService : DeleteVehicleService , private dialog: MatDialog) { }

  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;


  companySelected : CompanyModel;
  vehicleSelected : VehicleModel;
  registrationNG : string;

  vehicleSelectArray : VehicleModel[];
  companySelectArray : CompanyModel[];



  onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    const confirmDialog = this.dialog.open(ConfirmDialogVehicleDeleteComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to remove company '+this.vehicleSelected.registrationNumber+" ?"
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteVehicleService.deleteCompany(this.vehicleSelected).subscribe(
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

  ngOnInit() {

    this.clearSuccessMessage()
    this.clearErrorMessage()

    this.deleteVehicleService.getUniqueCompany().subscribe( data => {
      this.companySelectArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });

  }

  onChangeCompanySelect(company: CompanyModel ){

    this.deleteVehicleService.getVehicleByCompanyId(company.companyId).subscribe( data => {
      this.vehicleSelectArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });
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
