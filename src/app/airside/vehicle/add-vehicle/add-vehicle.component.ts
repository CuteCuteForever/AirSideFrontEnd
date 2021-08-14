import { Component, OnInit } from '@angular/core';
import {AddVehicleService} from "./add-vehicle.service";
import {Company} from "./company.model";
import {NgForm} from "@angular/forms";
import {Vehicle} from "./vehicle.model";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private addVehicleService : AddVehicleService) { }

  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  companyArray:  Company[];

  onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    const vehicle: Vehicle = new Vehicle(
      null,
      form.value.company.companyId,
      form.value.registrationNumber,
      "valid",
      new Date()
    );

    this.addVehicleService.insertVehicle(vehicle).subscribe(
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

    this.addVehicleService.getCompany().subscribe( data => {
      this.companyArray = data;
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
