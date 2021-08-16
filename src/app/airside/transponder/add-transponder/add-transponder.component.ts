import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AddTransponderService} from "./add-transponder.service";
import { TransponderModel} from "./transponder.model";
import {RfidService} from "../../rfid/rfid.service";

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

  constructor(private registerTransponderService : AddTransponderService , private rfidService : RfidService) { }

  ngOnInit() {
    //this.epcNG = "E20030340404010"
    this.isRFIDConnectedNow = this.rfidService.isRFIDConnected ;

    if (!this.isRFIDConnectedNow) {
      this.setErrorMessage("RFID Card Reader not connected. Please connect it before scanning.");
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

     console.log(transponder)
     this.registerTransponderService.insertTransponder(transponder).subscribe({
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

      this.registerTransponderService.scanEPC().subscribe( (data : any) => {
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
