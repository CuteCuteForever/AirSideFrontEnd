import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {TransponderModel} from "./transponder.model";
import {UpdateTransponderService} from "./update-transponder.service";

@Component({
  selector: 'app-update-transponder',
  templateUrl: './update-transponder.component.html',
  styleUrls: ['./update-transponder.component.css']
})
export class UpdateTransponderComponent implements OnInit {

  constructor(private updateTransponderService : UpdateTransponderService) { }

  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  transponderArray:  TransponderModel[];

  transponder : TransponderModel
  transponderIdNG : any;
  transponderRowIdNG : any;
  epcNG : any;
  callSignNG : any;
  descriptionNG : any;
  warrantyFromDateNG : any;
  warrantyToDateNG : any;
  serialNumberNG : any;
  serviceAvailabilityNG : any;

  serviceAvailabilityArray =  [
    {id: 1, value: 'Spare'},
    {id: 2, value: 'Not Spare'},
  ];

  onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();
    if (form.value.warrantyFromDate > form.value.warrantyToDate) {
      this.setErrorMessage("Warranty From Date cannot be older than Warrant To Date.")
    }

    if (!this.isError) {

      const transponderModel: TransponderModel = new TransponderModel(
        this.transponderRowIdNG,
        this.transponderIdNG,
        this.callSignNG,
        this.serialNumberNG,
        this.serviceAvailabilityNG,
        this.descriptionNG,
        this.warrantyFromDateNG,
        this.warrantyToDateNG,
        this.epcNG,
        "valid",
        new Date());

      console.log(transponderModel);

      this.updateTransponderService.updateTransponder(transponderModel).subscribe({
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

  ngOnInit() {
    this.clearSuccessMessage()
    this.clearErrorMessage()
    this.updateTransponderService.getTransponders().subscribe( data => {
      this.transponderArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });
  }

  onChangeCallSignSelect(val : TransponderModel ){
    this.transponderRowIdNG = (val.transponderRowId)
    this.transponderIdNG = (val.transponderId)
    this.callSignNG= (val.callSign)
    this.serialNumberNG= (val.serialNumber)
    this.descriptionNG= (val.description)
    this.warrantyFromDateNG= (val.warrantyFromDate)
    this.warrantyToDateNG= (val.warrantyToDate)
    this.epcNG= (val.epc)
    this.serviceAvailabilityNG = (val.serviceAvailability)
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
