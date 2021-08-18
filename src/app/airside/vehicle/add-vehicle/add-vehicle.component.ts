import {Component, Inject, OnInit} from '@angular/core';
import {AddVehicleService} from "./add-vehicle.service";
import {Company} from "./company.model";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Vehicle} from "./vehicle.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private addVehicleService : AddVehicleService , public dialogRef: MatDialogRef<AddVehicleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = new FormGroup ({
      company: new FormControl(),
      companyId: new FormControl(),
      registrationNumber: new FormControl()
    });


  }

  form: FormGroup;
  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  selectedCompanyId : string;
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

  selectedCompany(value : any){
    this.selectedCompanyId = value;
  }

  save(){

    const vehicle: Vehicle = new Vehicle(
      null,
      this.selectedCompanyId,
      this.form.value.registrationNumber,
      "valid",
      new Date()
    );

   this.dialogRef.close(vehicle);
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
