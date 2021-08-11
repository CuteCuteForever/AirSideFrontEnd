import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Company} from "./company.model";
import {BorrowTransponderService} from "../borrow-transponder/borrow-transponder.service";
import {Subject, Subscription} from "rxjs";
import {Vehicle} from "./vehicle.model";
import {BorrowTransponder} from "./borrowTransponder.model";
import {Transponder} from "./transponder.model";
import {RFIDServiceService} from "../../airside/rfid/rfidservice.service";
import {findAttributeOnElementWithAttrs} from "@angular/cdk/schematics";
import {consistOfArrays} from "angular-signature-pad/angular-signature-pad";
import {RegisterTransponderService} from "../register-transponder/register-transponder.service";


function sleep(milliseconds : any) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


@Component({
  selector: 'app-borrow-transponder',
  templateUrl: './borrow-transponder.component.html',
  styleUrls: ['./borrow-transponder.component.css']
})
export class BorrowTransponderComponent {

  constructor(private borrowTransponderService : BorrowTransponderService , private rfidService : RFIDServiceService ,private registerTransponderService : RegisterTransponderService) { }

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
    this.transponderArray = this.borrowTransponderService.getTransponderArray();
    this.subscription = this.borrowTransponderService.transponderSubject
      .subscribe(
        (transponderArray: Transponder[]) => {
          this.transponderArray = transponderArray;
        }
      );

    if (!this.isRFIDConnectedNow) {
      this.setErrorMessage("RFID Card Reader not connected. Please connect it before scanning.")
    }

    this.borrowTransponderService.getCompany().subscribe( data => {
      this.companyArray = data;
    }, error => {
      if (error.message){
        this.errorMessage = error.message
      }
      this.isError = true;
    });

    this.borrowTransponderService.getVehicle().subscribe( data => {
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
    this.borrowTransponderService.deleteEPC(this.transponderArray.length-1);
  }
  /*

    async isBorrowTransponderFoundInDB() : Promise<any>{

      let transponder ;
      for (const transponder of this.transponderArray)  {
        //need to check from db if the borrowed transponder exist on db or not
        await this.borrowTransponderService.checkBorrowedTransponderExistInDB(transponder.epc , "valid").toPromise().then((data: any) => {
          transponder = data;
        }, (err : any) =>{
        })
      }
      return Promise.resolve(transponder)
    }
  */

  async onSubmit(form: NgForm) {

    this.clearErrorMessage();
    console.log()

    console.log(JSON.stringify(this.transponderArray))

    /*this.borrowTransponderService.insertTranponderBorrower(JSON.stringify(this.transponderArray)).subscribe(
      (data: any) => {
      },
      (error: any) => {
      });
*/

    /*
        let callSign : string = "";
        let serialNumber : string = "";
        let epcNumber : string = "";

        if (result == undefined) {
          await this.InsertTransponder(callSign , serialNumber , epcNumber);
          await this.updateTransponderStatusRentOut(callSign , serialNumber , epcNumber);
          this.setSuccessMessage("Transponder borrowed successfully")
          form.reset();
        }
        else {
          this.epcArray.forEach( epcItem => {
            if (epcItem.epcNumber== result.epc){
              callSign = epcItem.callSign
              serialNumber = epcItem.serialNumber
              epcNumber= epcItem.epcNumber
            }
          })
          this.setErrorMessage("Transponder "+callSign +" | "+serialNumber+" | "+epcNumber+" already being borrowed!")
        }*/
  }
  /*
    InsertTransponder(callSign : string , serialNumber : string , epcNumber : string){
      this.epcArray.forEach((epc: EPC) => {
        const borrowTransponder: BorrowTransponder = new BorrowTransponder(
          epc.epcNumber,
          this.selectedCompany.companyID,
          this.transponderID,
          this.selectedVehicle.vehicleID,
          "valid",
          new Date());
        this.borrowTransponderService.insertTranponderBorrower(borrowTransponder).subscribe(
          (data: any) => {
          },
          (error: any) => {
          });
      });
    }

    updateTransponderStatusRentOut(callSign : string , serialNumber : string , epcNumber : string){

      this.epcArray.forEach((epc: EPC) => {
        this.registerTransponderService.updateTransponderStatus(epc.epcNumber , "Rent Out").subscribe(
          (data: any) => {
          },
          (error: any) => {
          });
      });

    }*/

  EPCButtonPress(form: NgForm) {

    this.clearErrorMessage();

    let transponderModel: Transponder;

    if (!this.isScanningEPC) {

      this.isScanningEPC = true;

      this.borrowTransponderService.scanEPC().subscribe((data: Transponder) => {
        this.isScanningEPC = false;
        transponderModel = data;
      }, (error: any) => {
        console.log(error.error.message)
        this.setErrorMessage(error.error.message)
      })


      // @ts-ignore
      if (transponderModel !== undefined) {
        this.borrowTransponderService.addTransponderToTransponderModelArray(transponderModel);
      }

      this.size = this.borrowTransponderService.getTransponderArray().length;
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


/*

async EPCButtonPress(form: NgForm){

  this.clearErrorMessage();

  if (!this.isScanningEPC) {

    this.isScanningEPC = true;

    await this.borrowTransponderService.scanEPC().toPromise().then((data: any) => {
      this.epcNumber = data.message;
      this.isScanningEPC = false;
    }, (error: any) => {
      console.log(error.error.message)
      this.errorMessage = error.error.message;
      this.isError = true;
    })

    if (this.epcNumber !== "") {

      let epc: EPC = new EPC()

      //we call transponder rest api because we need to get the call sign and serial number display on screen
      await this.borrowTransponderService.getTransponderByEPCAndRowRecordStatus(this.epcNumber, "valid").toPromise().then((data: any) => {
        epc.epcNumber = data.epc
        epc.callSign = data.callSign
        epc.serialNumber = data.serialNumber
        this.transponderID = data.transponderID;
      }, (err : any) => {
        this.isError = true ;
        this.errorMessage = err.error.message;
      });
    }else {
      this.isScanningEPC = false
    }
  }

  this.size = this.borrowTransponderService.getEPCs().length ;
}*/

/*


async onSubmit(form: NgForm) {

  this.clearErrorMessage();
  let result : any = await this.isBorrowTransponderFoundInDB();

  let callSign : string = "";
  let serialNumber : string = "";
  let epcNumber : string = "";


  if (result == undefined) {
    await this.InsertTransponder(callSign , serialNumber , epcNumber);
    await this.updateTransponderStatusRentOut(callSign , serialNumber , epcNumber);
    this.setSuccessMessage("Transponder borrowed successfully")
    form.reset();
  }
  else {
    this.epcArray.forEach( epcItem => {
      if (epcItem.epcNumber== result.epc){
        callSign = epcItem.callSign
        serialNumber = epcItem.serialNumber
        epcNumber= epcItem.epcNumber
      }
    })
    this.setErrorMessage("Transponder "+callSign +" | "+serialNumber+" | "+epcNumber+" already being borrowed!")
  }
}*/
