import { Component, OnInit } from '@angular/core';
import {Company} from "../../company/update-company/company.model";
import {NgForm} from "@angular/forms";
import {VehicleService} from "./update-vehicle.service";
import {Vehicle} from "../add-vehicle/vehicle.model";
import {VehicleCompanyModel} from "./vehicle-company.model";

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent  implements OnInit {

  constructor(private vehicleService : VehicleService) { }

  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  vehicleCompanyArray:  VehicleCompanyModel[];
  vehicleCompany : VehicleCompanyModel;

  registrationNumberSelected : string;

  vehicleSelectArray : string[];
  companySelectArray : string[];

  registrationFC : any;

  onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

   /* const vehicle: Vehicle = new Vehicle(
      form.value.company.companyId,
      form.value.registrationNumber,
      "valid",
      new Date()
    );

    this.vehicleService.updateVehicle(vehicle).subscribe(
      (data : any) => {
        this.setSuccessMessage(data.message)
        form.reset();
      },
      (error : any) => {
        if (error.error.message) {
          this.setErrorMessage(error.error.message)
        }
      }
    );*/

  }

  ngOnInit() {

    this.clearSuccessMessage()
    this.clearErrorMessage()

    this.vehicleService.getVehicleCompany().subscribe( data => {
      this.vehicleCompanyArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });


    this.vehicleCompanyArray.forEach(s => {

    })

  }

  async onChangeCompanySelect(vehicleCompanyModel : VehicleCompanyModel ){

    let tempCompanyName = vehicleCompanyModel.companyName;

    this.vehicleCompanyArray.forEach( s => {
      if (s.companyName === tempCompanyName) {
        this.vehicleSelectArray.push(s.vehicleRegistrationNumber)
      }
    })
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
