import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {UpdateVehicleService} from "./update-vehicle.service";
import {VehicleCompanyModel} from "../view-vehicle/vehicle-company.model";
import {VehicleModel} from "./vehicle.model";
import {CompanyModel} from "./company.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent  implements OnInit {

  vehicleCompanyModel : VehicleCompanyModel;
  form: FormGroup;
  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;


  companySelected : CompanyModel;
  vehicleSelected : VehicleModel;
  registrationNG : string;

  vehicleSelectArray : VehicleModel[];
  companySelectArray : CompanyModel[];

  constructor(private updateVehicleService : UpdateVehicleService, public dialogRef: MatDialogRef<UpdateVehicleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.vehicleCompanyModel  = data.vehicleCompanyData;

    this.form = new FormGroup ({
      companyName: new FormControl(this.vehicleCompanyModel.companyName),
      registrationNumber: new FormControl(this.vehicleCompanyModel.vehicleRegistrationNumber),
      newRegistrationNumber: new FormControl(),
    });

    this.form.controls['companyName'].disable();
    this.form.controls['registrationNumber'].disable();
  }


  onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();


    const vehicle: VehicleModel = new VehicleModel(
      this.vehicleSelected.vehicleRowId,
      this.vehicleSelected.vehicleId,
      this.companySelected.companyId,
      this.registrationNG,
      "valid",
      new Date()
    );

    this.updateVehicleService.updateVehicle(vehicle).subscribe(
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

    this.updateVehicleService.getUniqueCompany().subscribe( data => {
      this.companySelectArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });

  }

  onChangeCompanySelect(company: CompanyModel ){

    this.updateVehicleService.getVehicleByCompanyId(company.companyId).subscribe( data => {
      this.vehicleSelectArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });
  }

  onChangeVehicleSelect(vehicleModel: VehicleModel ){
    this.vehicleSelected = vehicleModel;
  }

  save(){
    const vehicle: VehicleModel = new VehicleModel(
      null,
      this.vehicleCompanyModel.vehicleId,
      this.vehicleCompanyModel.companyId,
      this.form.value.newRegistrationNumber,
      "valid",
      new Date()
    );

    this.dialogRef.close(vehicle);
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
