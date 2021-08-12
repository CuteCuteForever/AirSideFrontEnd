import { Component, OnInit } from '@angular/core';
import {Transponder} from "../borrow-transponder/transponder.model";
import {Subscription} from "rxjs";
import {TransponderStatusService} from "./transponder-status.service";
import {RFIDServiceService} from "../../airside/rfid/rfidservice.service";
import {NgForm} from "@angular/forms";
import {ServicedTransponderModel} from "./serviced-transponder.model";


@Component({
  selector: 'app-serviced-transponder',
  templateUrl: './serviced-transponder.component.html',
  styleUrls: ['./serviced-transponder.component.css']
})
export class ServicedTransponderComponent implements OnInit {

  isSuccessful = false;
  successMessage = "";
  isError = false;
  errorMessage : string;

  transponderArray: Transponder[];
  subscription: Subscription;

  isRFIDConnectedNow = false;
  isScanningEPC = false;
  transponderID : string;
  size : number = 0;

  constructor(private transponderStatusService : TransponderStatusService  , private rfidService : RFIDServiceService) { }

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

    this.size = this.transponderArray.length
  }

  onRemoveEPC(){
    this.clearErrorMessage();
    this.clearSuccessMessage();
    this.transponderStatusService.deleteEPC(this.transponderArray.length-1);
  }

  onSubmit(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    let servicedTransponderModelArray : ServicedTransponderModel[] = [];

    this.transponderArray.forEach( (transponder : Transponder) =>  {

      let repairTransponderModel : ServicedTransponderModel = new ServicedTransponderModel(
        transponder.epc,
        transponder.callSign,
        transponder.serialNumber);

      servicedTransponderModelArray.push(repairTransponderModel);

    });

    this.transponderStatusService.insertServicedTransponderStatus(JSON.stringify(servicedTransponderModelArray)).subscribe( (data : any) =>{
      this.setSuccessMessage(data.message)
    } , (error : any) =>{
      console.log(error)
      if (error.error.message){
        this.setErrorMessage(error.error.message)
      }
    });

    form.reset();
  }

  EPCButtonPress(form: NgForm){

    this.clearErrorMessage();
    this.clearSuccessMessage();

    let transponderModel: Transponder ;

    if (!this.isScanningEPC){

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

    this.isScanningEPC = false;
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
