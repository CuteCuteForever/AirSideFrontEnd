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



/*

async onSubmit(form: NgForm) {
  this.isError = false;
  const value = form.value;

  const vehicle: Vehicle = new Vehicle(
    this.selectedCompany.companyID,
    value.registrationNumber,
    "valid",
    new Date());

  //need to check from db if transponder exist on db or not
  let isVehicleExist = await this.addVehicleService.checkVehicleExistInDB(value.registrationNumber , "valid").toPromise().then((data: any) => {
    return true;
  }).catch((err: any) => {
    return false;
  });

  if (!isVehicleExist) {
    this.addVehicleService.insertVehicle(vehicle).subscribe({
      next: data => {
        this.isInserted = true
        this.message = data.message;
      },
      error: error => {
        if (error.message) {
          return error.message;
        }
      }
    })
    form.reset();
    console.log(vehicle);
  } else {
    this.isError = true;
    this.errorMessage = "Vehicle "+value.registrationNumber +" Exist ! Please enter another vehicle."
  }
}*/
