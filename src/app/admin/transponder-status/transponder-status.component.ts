import { Component, OnInit } from '@angular/core';
import {RFIDServiceService} from "../../airside/rfid/rfidservice.service";
import {RegisterTransponderService} from "../register-transponder/register-transponder.service";
import {Transponder} from "../borrow-transponder/transponder.model";
import {Subscription} from "rxjs";
import {Company} from "../borrow-transponder/company.model";
import {Vehicle} from "../borrow-transponder/vehicle.model";
import {NgForm} from "@angular/forms";
import {TransponderStatusService} from "../borrow-transponder/transponder-status.service";
import {TransponderStatusModel} from "../borrow-transponder/transponder-status.model";

@Component({
  selector: 'app-transponder-status',
  templateUrl: './transponder-status.component.html',
  styleUrls: ['./transponder-status.component.css']
})
export class TransponderStatusComponent {

  constructor(private transponderStatusService : TransponderStatusService , private rfidService : RFIDServiceService ,private registerTransponderService : RegisterTransponderService) { }

  isSuccessful = false;
  successMessage = ""
  isError = false;
  errorMessage = ""

  transponderArray: Transponder[];
  subscription: Subscription;

  isScanningEPC = false;
  isRFIDConnectedNow = false;
  companyArray:  Company[];
  vehicleArray:  Vehicle[];
  selectedCompany : Company ;
  selectedVehicle : Vehicle ;
  transponderID : string;
  epcNumber : string ="" ;
  size : number = 0;

  ngOnInit() {

    this.isRFIDConnectedNow = this.rfidService.isRFIDConnected ;
    this.transponderArray = this.transponderStatusService.getTransponderArray();
    this.subscription = this.transponderStatusService.transponderSubject
      .subscribe(
        (transponderArray: Transponder[]) => {
          this.transponderArray = transponderArray;
        }
      );

    if (!this.isRFIDConnectedNow) {
      this.setErrorMessage("RFID Card Reader not connected. Please connect it before scanning.")
    }

    this.transponderStatusService.getCompany().subscribe( data => {
      this.companyArray = data;
    }, error => {
      if (error.message){
        this.errorMessage = error.message
      }
      this.isError = true;
    });

    this.transponderStatusService.getVehicle().subscribe( data => {
      this.vehicleArray = data;
    }, error => {
      if (error.message){
        this.errorMessage = error.message
      }
      this.isError = true;
    });

  }

  onRemoveEPC(){
    this.clearErrorMessage();
    this.clearSuccessMessage();
    this.transponderStatusService.deleteEPC(this.transponderArray.length-1);
  }

  async onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    console.log( form.value.company.companyId)
    console.log( form.value.vehicle.vehicleId)

    let transponderStatusModel : TransponderStatusModel;
    this.transponderArray.forEach( (transponder : Transponder) =>  {
      transponderStatusModel.epc = transponder.epc;
      transponderStatusModel.companyId = form.value.company.companyId;
      transponderStatusModel.out_timestamp = new Date();
      //transponderStatusModel.in_timestamp = // no need enter. leave it blank
      transponderStatusModel.transponderId = transponder.transponderId;
      transponderStatusModel.transponderStatus = "Rent Out";
      transponderStatusModel.vehicleId = form.value.vehicle.vehicleId;
      transponderStatusModel.rowRecordStatus = "valid";
      transponderStatusModel.timestamp = new Date();

    });
  }

  EPCButtonPress(form: NgForm) {

    this.clearErrorMessage();

    let transponderModel: Transponder ;

    if (!this.isScanningEPC) {

      this.isScanningEPC = true;

      this.transponderStatusService.scanEPC().subscribe((data: Transponder) => {
        this.isScanningEPC = false;
        transponderModel = data;
      }, (error: any) => {
        console.log(error.error.message)
        this.setErrorMessage(error.error.message)
      })


      // @ts-ignore
      if (transponderModel !== undefined) {
        this.transponderStatusService.addTransponderToTransponderModelArray(transponderModel);
      }

      this.size = this.transponderStatusService.getTransponderArray().length;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
