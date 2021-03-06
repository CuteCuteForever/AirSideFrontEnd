import { Component, OnInit } from '@angular/core';
import { RfidService } from './rfid.service';
import {NgForm} from "@angular/forms";
import {concat, forkJoin, Subject, Subscription} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {takeUntil} from "rxjs/operators";

function sleep(milliseconds : any) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

@Component({
  selector: 'app-rfid',
  templateUrl: './rfid.component.html',
  styleUrls: ['./rfid.component.css']
})
export class RFIDComponent implements OnInit {

  isLoading = false;

  isError = false;
  isSuccessful = false;
  successMessage: string = "";
  errorMessage :string ="";

  transportValue: string;
  workModeValue: string;
  deviceAddressValue: string;
  filterTimeValue: string;
  rfPowerValue: string;
  beepEnableValue: string;
  uartBaudRateValue: string;

  isOpenRFIDReader = false;

  ERROR_CONNECT_DISCONNECT : string = "An error occurred. Please close RFID Card Reader and initialize again";

  constructor(private rfidService: RfidService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.isOpenRFIDReader = this.rfidService.isRFIDConnected;
    this.transportValue= this.rfidService.transportValue
    this.workModeValue= this.rfidService.workModeValue
    this.deviceAddressValue= this.rfidService.deviceAddressValue
    this.filterTimeValue= this.rfidService.filterTimeValue
    this.rfPowerValue= this.rfidService.rfPowerValue
    this.beepEnableValue= this.rfidService.beepEnableValue
    this.uartBaudRateValue= this.rfidService.uartBaudRateValue
  }


  async getData() {

    this.clearErrorMessage()
    this.clearSuccessMessage()

    this.isLoading = true;

    if (this.isOpenRFIDReader) {
      this.transportValue = await this.rfidService.getDeviceParam(1).toPromise().then((result: any) => {
        if(result) {
          this.rfidService.transportValue = result.message
          return result.message
        }
      } , (error : any) => {
        this.setErrorMessage(this.ERROR_CONNECT_DISCONNECT);
      });
    }

    if (this.isOpenRFIDReader) {
      this.workModeValue = await this.rfidService.getDeviceParam(2).toPromise().then((result: any) => {
        if(result) {
          this.rfidService.workModeValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(this.ERROR_CONNECT_DISCONNECT);
      });
    }


    if (this.isOpenRFIDReader) {
      this.deviceAddressValue = await this.rfidService.getDeviceParam(3).toPromise().then((result: any) => {
        if(result) {
          this.rfidService.deviceAddressValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(this.ERROR_CONNECT_DISCONNECT);
      });
    }


    if (this.isOpenRFIDReader) {
      this.filterTimeValue = await this.rfidService.getDeviceParam(4).toPromise().then((result: any) => {
        if(result) {
          this.rfidService.filterTimeValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(this.ERROR_CONNECT_DISCONNECT);
      });
    }

    if (this.isOpenRFIDReader) {
      this.rfPowerValue = await this.rfidService.getDeviceParam(5).toPromise().then((result: any) => {
        if(result) {
          this.rfidService.rfPowerValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(this.ERROR_CONNECT_DISCONNECT);
      });
    }

    if (this.isOpenRFIDReader) {
      this.beepEnableValue = await this.rfidService.getDeviceParam(6).toPromise().then((result: any) => {
        if(result) {
          this.rfidService.beepEnableValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(this.ERROR_CONNECT_DISCONNECT);
      });
    }

    if (this.isOpenRFIDReader) {
      this.uartBaudRateValue = await this.rfidService.getDeviceParam(7).toPromise().then((result: any) => {
        if(result) {
          this.rfidService.uartBaudRateValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(this.ERROR_CONNECT_DISCONNECT);
      });
    }

    this.isLoading = false;
  }

  onSubmit(form: NgForm) {
    this.updateDeviceParam(form);
  }

  async updateDeviceParam(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    this.isLoading = true;
    this.successMessage = "";

    await this.rfidService.updateDeviceParam(1 , form.value.transport).toPromise()
    await this.rfidService.updateDeviceParam(2 , form.value.workMode).toPromise()
    await this.rfidService.updateDeviceParam(3 , form.value.deviceAddress).toPromise()
    await this.rfidService.updateDeviceParam(4 , form.value.filterTime).toPromise()
    await this.rfidService.updateDeviceParam(5 , form.value.rfPower).toPromise()
    await this.rfidService.updateDeviceParam(6 , form.value.beepEnable).toPromise()
    await this.rfidService.updateDeviceParam(7 , form.value.uartBaudRate).toPromise()

    this.successMessage ="Successfully Updated."
    this.isSuccessful = true;
    this.isLoading = false;
  }

  openRFIDCardReader() {

    this.isLoading = true;
    this.isOpenRFIDReader = true;

    this.clearSuccessMessage()
    this.clearErrorMessage()

    this.rfidService.openRFIDCardReader().subscribe((data: any) => {
      this.setSuccessMessage(data.message);
      this.isLoading = false;
      this.rfidService.desktopReaderConnectedStatusEmitter.next(true);
    }, (error :any) => {
      console.log(error)
      this.setErrorMessage(error.error.message);
      this.isLoading = false;
    });

  }

  clearFields(form : NgForm){

    this.clearErrorMessage();
    this.clearSuccessMessage();

    form.reset();
  }

  closeRFIDCardReader(){

    this.isLoading = true;
    this.clearErrorMessage()
    this.clearSuccessMessage()
    this.isOpenRFIDReader = false;

    this.rfidService.closeRFIDCardReader().subscribe((data: any) => {
      this.setSuccessMessage(data.message)
      this.isLoading = false;
      this.rfidService.desktopReaderConnectedStatusEmitter.next(false);
    }, error => {
      this.setErrorMessage(error.error.message)
      this.isLoading = false;
    });



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


