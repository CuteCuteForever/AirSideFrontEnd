import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ReturnEPC} from "./returnEPC.model";
import {ReturnTransponderService} from "./return-transponder.service";
import {Subscription} from "rxjs";
import {Company} from "../borrow-transponder/company.model";
import {Vehicle} from "../borrow-transponder/vehicle.model";
import {ReturnTransponder} from "./returnTransponder.model";
import {RFIDServiceService} from "../../airside/rfid/rfidservice.service";

@Component({
  selector: 'app-return-transponder',
  templateUrl: './return-transponder.component.html',
  styleUrls: ['./return-transponder.component.css']
})
export class ReturnTransponderComponent implements OnInit {

  isRFIDConnectedNow = false;

  isInserted = false
  epcArray: ReturnEPC[];
  private subscription: Subscription;
  epcBtnValue = "Scan EPC";
  isScanningEPC = false;
  isError = false;
  companyArray:  Company[];
  vehicleArray:  Vehicle[];
  selectedCompany : Company ;
  selectedVehicle : Vehicle ;
  errorMessage : string;
  transponderID : string;
  epcNumber : string ;
  size : number = 0;

  constructor(private returnTransponderService : ReturnTransponderService , private rfidService : RFIDServiceService) { }

  ngOnInit() {

    this.isRFIDConnectedNow = this.rfidService.isRFIDConnected ;

    if (!this.isRFIDConnectedNow) {
      this.errorMessage = "RFID Card Reader not connected. Please connect it before scanning."
    }

    this.epcArray = this.returnTransponderService.getEPCs();
    this.subscription = this.returnTransponderService.epcChangedArray
      .subscribe(
        (epcArray: ReturnEPC[]) => {
          this.epcArray = epcArray;
        }
      );
  }

  onRemoveEPC(){
    this.returnTransponderService.deleteEPC(this.epcArray.length-1);
    //form.reset();
  }

  async onSubmit(form: NgForm) {
    for (const epc of this.epcArray) {

      const returnTransponder: ReturnTransponder = new ReturnTransponder(
        epc.epcNumber,
        "INVALID",
        new Date()
      );

      await this.returnTransponderService.insertTranponderReturn(returnTransponder).toPromise()
      await this.returnTransponderService.updateBorrowedTransponderRowRecordStatus(epc.epcNumber , "INVALID").toPromise()

      this.isInserted = true;
    }

    form.reset();
  }

  async EPCButtonPress(form: NgForm){

    if (!this.isScanningEPC){

      this.isScanningEPC = true;
      this.epcBtnValue = "Scanning";

      await this.returnTransponderService.scanEPC().toPromise().then((data: any) => {
        this.epcNumber = data.message;
        this.isScanningEPC = false;
      }, (error: any) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.isError = true;
      })

      //need to check from db if transponder exist on db or not
      let isBorrowExist = await this.returnTransponderService.checkReturnedTransponderExistInDB(this.epcNumber , "valid").toPromise().then((data: any) => {
        this.isError = true;
        this.errorMessage = "Transponder already being borrowed. Please scan another."
        return true; //transponder in borrowed database found
      }).catch((err) => {
        return false; //no transponder found in borrowed database found
      });

      if (this.epcNumber !== "" && !isBorrowExist) {
        let epc: ReturnEPC = new ReturnEPC()

        //we call transponder rest api because we need to get the call sign and serial number display on screen
        await this.returnTransponderService.getTransponderByEPCAndRowRecordStatus(this.epcNumber, "valid").toPromise().then((data: any) => {
          epc.epcNumber = data.epc
          epc.callSign = data.callSign
          epc.serialNumber = data.serialNumber
        })

        if (!this.returnTransponderService.isEPCFoundInFrontEndArray(epc.epcNumber)) {
          this.returnTransponderService.addEPC(epc.epcNumber, epc.callSign);
        } else {
          this.errorMessage = "Transponder already being scanned already. Please select another."
          this.isError = true;
        }
      }else {
        this.isScanningEPC = false
      }
    }

    this.size = this.returnTransponderService.getEPCs().length ;
  }

}
