import { Component, OnInit } from '@angular/core';
import {TransponderStatusService} from "./transponder-status.service";
import {RfidService} from "../../rfid/rfid.service";
import {AddTransponderService} from "../../transponder/add-transponder/add-transponder.service";
import {TransponderModel} from "./transponder.model";
import {Subscription} from "rxjs";
import {Company} from "./company.model";
import {Vehicle} from "./vehicle.model";
import {NgForm} from "@angular/forms";
import {TransponderStatusModel} from "./transponder-status.model";

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

  transponderArray: TransponderModel[];
  subscription: Subscription;

  isScanningEPC = false;
  isRFIDConnectedNow = false;
  companyArray:  Company[];
  vehicleArray:  Vehicle[];
  selectedCompany : Company ;
  selectedVehicle : Vehicle ;
  transponderID : string;
  size : number = 0;

  rentalDurationArray = [
    {id: 1, value: 'Daily'},
    {id: 2, value: 'Weekly'},
    {id: 3, value: 'Monthly'},
    {id: 4, value: 'Yearly'},
  ];

  constructor(private transponderStatusService : TransponderStatusService , private rfidService : RfidService ) { }

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

    let transponderStatusModelArray : TransponderStatusModel[] = [];

    this.transponderArray.forEach( (transponder : TransponderModel) =>  {

      let transponderStatusModel : TransponderStatusModel = new TransponderStatusModel(
        null,
        transponder.epc,
        form.value.company.companyId,
        new Date(),
        new Date(), //ignoring this value
        form.value.rentalDuration.value, //ignoring this value
        transponder.transponderId,
        "Rent Out",
        form.value.vehicle.vehicleId,
        "valid",
        new Date());
      transponderStatusModelArray.push(transponderStatusModel);

    });


    console.log(transponderStatusModelArray)

    this.transponderStatusService.insertBorrowTransponderStatus(JSON.stringify(transponderStatusModelArray)).subscribe( (data : any) =>{
      this.setSuccessMessage(data.message)
    } , (error : any) =>{
      console.log(error)
      if (error.error.message){
        this.setErrorMessage(error.error.message)
      }
    });

    form.reset();
  }

  async EPCButtonPress(form: NgForm) {

    this.isScanningEPC = true;

    this.clearErrorMessage();
    this.clearSuccessMessage();

    let transponderModel: TransponderModel ;

    await this.transponderStatusService.scanEPC().toPromise().then((data: any) => {
      console.log(data)
      this.isScanningEPC = false;
      transponderModel = data;
    }, (error: any) => {
      console.log(error)
      this.setErrorMessage(error.error.message)
      this.isScanningEPC = false;
    })

    // @ts-ignore
    console.log(transponderModel);

    // @ts-ignore
    if (transponderModel !== undefined) {
      this.transponderStatusService.addTransponderToTransponderModelArray(transponderModel);
    }
    this.size = this.transponderStatusService.getTransponderArray().length;

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
