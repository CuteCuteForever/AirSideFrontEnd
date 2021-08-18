import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {AddTransponderService} from "./add-transponder.service";
import { TransponderModel} from "./transponder.model";
import {RfidService} from "../../rfid/rfid.service";
import {AddCompanyService} from "../../company/add-company/add-company.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

const REST_API_SERVER = 'http://localhost:8080/';

@Component({
  selector: 'app-register-transponder',
  templateUrl: './add-transponder.component.html',
  styleUrls: ['./add-transponder.component.css']
})
export class AddTransponderComponent implements OnInit {

  isSuccessful = false;
  successMessage = "";
  isError = false;
  errorMessage : string;

  isRFIDConnectedNow = false;
  isScanningEPC = false;
  epcNG : string ;
  size : string

  serviceAvailabilityArray =  [
    {id: 1, value: 'Spare'},
    {id: 2, value: 'Not Spare'},
  ];

  constructor(private addTransponderService : AddTransponderService , private rfidService : RfidService , public dialogRef: MatDialogRef<AddTransponderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    //this.epcNG = "E20030340404010"
    this.isRFIDConnectedNow = this.rfidService.isRFIDConnected ;

    if (!this.isRFIDConnectedNow) {
      this.setErrorMessage("Please connect Card Reader first.");
    }

  }

   onSubmit(form: NgForm) {

     this.clearErrorMessage();
     this.clearSuccessMessage();

     if (form.value.warrantyFromDate > form.value.warrantyToDate) {
       console.log("here")
       this.setErrorMessage("Warranty From Date cannot be older than Warrant To Date.")
     }

     if (!this.isError) {

     const transponder: TransponderModel = new TransponderModel(
       null,
       null,
       form.value.callSign,
       form.value.serialNumber,
       form.value.serviceAvailability.value,
       form.value.description,
       form.value.warrantyFromDate,
       form.value.warrantyToDate,
       //"E20030340404010",
       this.epcNG,
       "valid",
       new Date());

     this.addTransponderService.insertTransponder(transponder).subscribe({
       next: data => {
         this.setSuccessMessage(data.message);
       },
       error: error => {
         if (error) {
           this.setErrorMessage(error);
         }
       }
     })

     form.reset();
   }
  }


  EPCButtonPress(form: NgForm){

    if (!this.isScanningEPC){

      this.isScanningEPC = true;

      this.addTransponderService.scanEPC().subscribe( (data : any) => {
        this.epcNG = data.message ;
        this.isScanningEPC = false
      }, error => {
        console.log(error)
        if (error.error.message){
          this.setErrorMessage(error.error.message)
        }
        this.isScanningEPC = false
      });
    }

  }

  save(form: NgForm) {

    this.clearSuccessMessage()
    this.clearErrorMessage()

    if (new Date(form.value.warrantyFromDate) > new Date(form.value.warrantyToDate)) {
      this.setErrorMessage("Warranty From Date cannot be older than Warrant To Date.")
    }

    if (!this.isError) {

      const transponder: TransponderModel = new TransponderModel(
        null,
        null,
        form.value.callSign,
        form.value.serialNumber,
        form.value.serviceAvailability.value,
        form.value.description,
        form.value.warrantyFromDate,
        form.value.warrantyToDate,
        //"E111111111111",
        this.epcNG,
        "valid",
        new Date());

      this.dialogRef.close(transponder);
    }
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
