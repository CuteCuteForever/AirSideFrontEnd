import { Component, OnInit } from '@angular/core';
import {TransponderModel} from "./transponder.model";
import {Subscription} from "rxjs";
import {TransponderStatusService} from "./transponder-status.service";
import {RfidService} from "../../rfid/rfid.service";
import {NgForm} from "@angular/forms";
import {RepairTransponderModel} from "./repair-transponder.model";

@Component({
  selector: 'app-repair-transponder',
  templateUrl: './repair-transponder.component.html',
  styleUrls: ['./repair-transponder.component.css']
})
export class RepairTransponderComponent implements OnInit {

  isSuccessful = false;
  successMessage = "";
  isError = false;
  errorMessage : string;

  transponderArray: TransponderModel[];
  subscription: Subscription;

  isRFIDConnectedNow = false;
  isScanningEPC = false;
  transponderID : string;
  size : number = 0;

  constructor(private transponderStatusService : TransponderStatusService  , private rfidService : RfidService) { }

  ngOnInit() {

    this.isRFIDConnectedNow = this.rfidService.isRFIDConnected ;

    this.transponderArray = this.transponderStatusService.getTransponderArray();

    this.subscription = this.transponderStatusService.transponderSubject
      .subscribe(
        (transponderArray: TransponderModel[]) => {
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

    let repairTransponderModelArray : RepairTransponderModel[] = [];

    this.transponderArray.forEach( (transponder : TransponderModel) =>  {

      let repairTransponderModel : RepairTransponderModel = new RepairTransponderModel(
        transponder.epc,
        transponder.callSign,
        transponder.serialNumber);

      repairTransponderModelArray.push(repairTransponderModel);

    });

    this.transponderStatusService.insertRepairTransponderStatus(JSON.stringify(repairTransponderModelArray)).subscribe( (data : any) =>{
      this.setSuccessMessage(data.message)
    } , (error : any) =>{
      console.log(error)
      if (error.error.message){
        this.setErrorMessage(error.error.message)
      }
    });

    form.reset();
  }

  async EPCButtonPress(form: NgForm){

    this.isScanningEPC = true;

    this.clearErrorMessage();
    this.clearSuccessMessage();

    let transponderModel: TransponderModel ;

    await this.transponderStatusService.scanEPC().toPromise().then((data: any) => {
      this.isScanningEPC = false;
      transponderModel = data;
    }, (error: any) => {
      this.setErrorMessage(error.error.message)
      this.isScanningEPC = false;
    })

    // @ts-ignore
    if (transponderModel !== undefined) {
      this.transponderStatusService.addTransponderToTransponderModelArray(transponderModel);
    }
    this.size = this.transponderStatusService.getTransponderArray().length;
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
