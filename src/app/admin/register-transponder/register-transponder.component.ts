import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RegisterTransponderService} from "./register-transponder.service";
import {Transponder} from "./transponder.model";
import {RFIDServiceService} from "../../airside/rfid/rfidservice.service";

const REST_API_SERVER = 'http://localhost:8080/';

@Component({
  selector: 'app-register-transponder',
  templateUrl: './register-transponder.component.html',
  styleUrls: ['./register-transponder.component.css']
})
export class AddTransponderComponent implements OnInit {

  isSuccessful = false;
  successMessage = "";
  isError = false;
  errorMessage : string;

  isRFIDConnectedNow = false;
  epcBtnValue = "Start Scan";
  isScanningEPC = false;
  companyID : number;
  epcTxtBoxValue : string ;
  selectedServiceAvailability : any;
  size : string

  serviceAvailabilityArray =  [
    {id: 1, value: 'Spare'},
    {id: 2, value: 'Not Spare'},
  ];


  constructor(private registerTransponderService : RegisterTransponderService , private rfidService : RFIDServiceService) { }

  ngOnInit() {
    this.epcTxtBoxValue = "E20030340404010"
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

     const transponder: Transponder = new Transponder(
       form.value.callSign,
       form.value.serialNumber,
       this.selectedServiceAvailability.value,
       form.value.description,
       form.value.warrantyFromDate,
       form.value.warrantyToDate,
       this.epcTxtBoxValue,
       "valid",
       new Date());

     this.registerTransponderService.insertTransponder(transponder).subscribe({
       next: data => {
         this.setSuccessMessage(data.message);
       },
       error: error => {
         if (error.error.message) {
           this.setErrorMessage(error.error.message);
         }
       }
     })

     form.reset();
   }
  }


  EPCButtonPress(form: NgForm){

    if (!this.isScanningEPC){

      this.isScanningEPC = true;
      this.epcBtnValue = "Scanning";

      this.registerTransponderService.scanEPC().subscribe( (data : any) => {

        this.epcTxtBoxValue = data.message ;
        this.epcBtnValue = "Start Scan";
        this.isScanningEPC = false
      }, error => {
        if (error.error.message){
          this.setErrorMessage(error.error.message)
          console.log(error.message)
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
