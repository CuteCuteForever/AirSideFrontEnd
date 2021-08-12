import { Component, OnInit } from '@angular/core';
import {TransponderStatusService} from "./transponder-status.service";
import {RFIDServiceService} from "../../airside/rfid/rfidservice.service";
import {RegisterTransponderService} from "../register-transponder/register-transponder.service";
import {Transponder} from "./transponder.model";
import {Subscription} from "rxjs";
import {Company} from "./company.model";
import {Vehicle} from "./vehicle.model";
import {NgForm} from "@angular/forms";
import {TransponderStatusModel} from "./transponder-status.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-borrow-transponder',
  templateUrl: './borrow-transponder.component.html',
  styleUrls: ['./borrow-transponder.component.css']
})
export class BorrowTransponderComponent implements OnInit {

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

  constructor(private transponderStatusService : TransponderStatusService , private rfidService : RFIDServiceService ,private registerTransponderService : RegisterTransponderService) { }

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
      if (error.error.message){
        this.setErrorMessage(error.error.message);
      }
    });

    this.transponderStatusService.getVehicle().subscribe( data => {
      this.vehicleArray = data;
    }, error => {
      if (error.error.message){
        this.setErrorMessage(error.error.message);
      }
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

    let transponderStatusModelArray : TransponderStatusModel[] = [];

    this.transponderArray.forEach( (transponder : Transponder) =>  {

      let transponderStatusModel : TransponderStatusModel = new TransponderStatusModel(
        transponder.epc,
        form.value.company.companyId,
        new Date(),
        new Date(1970, 0, 1, 9, 30), //ignoring this value
        transponder.transponderId,
        "Rent Out",
        form.value.vehicle.vehicleId,
        "valid",
        new Date());

       transponderStatusModelArray.push(transponderStatusModel);

    });

    console.log(JSON.stringify(transponderStatusModelArray))

    this.transponderStatusService.insertTranponderStatus(JSON.stringify(transponderStatusModelArray)).subscribe( (data : any) =>{
      this.setSuccessMessage(data.message)
    } , (error : any) =>{
      console.log(error)
      if (error.error.message){
        this.setErrorMessage(error.error.message)
      }
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
