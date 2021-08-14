import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UpdateVehicleService} from "./update-vehicle.service";
import {VehicleCompanyModel} from "./vehicle-company.model";
import {VehicleModel} from "./vehicle.model";
import {CompanyModel} from "./company.model";

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent  implements OnInit {

  constructor(private updateVehicleService : UpdateVehicleService) { }

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


    const vehicle: VehicleModel = new VehicleModel(
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
