import { Component, OnInit } from '@angular/core';
import { RFIDServiceService } from './rfidservice.service';
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

  subscription: Subscription
  private REST_API_SERVER = "http://localhost:8080/";

  constructor(private rfidService: RFIDServiceService, private httpClient: HttpClient) {
  }

  isLoading = false;

  isSuccessful = true;
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

  ngOnInit(): void {
    this.isLoading = false;

    if (!this.isOpenRFIDReader) {
      this.errorMessage ="Please refrain from placing RFID tags on Card Reader upon connecting."
      this.isSuccessful = false;
    }
  }


  async getData() {

    this.isSuccessful = true;
    this.isLoading = true;

    if (this.isOpenRFIDReader) {
      this.transportValue = await this.rfidService.getDeviceParam(1).toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      } , (error : any) => {
        this.isSuccessful = false
        this.errorMessage = error.message
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      });
    }

    if (this.isOpenRFIDReader) {
      this.workModeValue = await this.rfidService.getDeviceParam(2).toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      });
    }


    if (this.isOpenRFIDReader) {
      this.deviceAddressValue = await this.rfidService.getDeviceParam(3).toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        this.errorMessage = error.message
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      });
    }


    if (this.isOpenRFIDReader) {
      this.filterTimeValue = await this.rfidService.getDeviceParam(4).toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      });
    }

    if (this.isOpenRFIDReader) {
      this.rfPowerValue = await this.rfidService.getDeviceParam(5).toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      });
    }

    if (this.isOpenRFIDReader) {
      this.beepEnableValue = await this.rfidService.getDeviceParam(6).toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      });
    }

    if (this.isOpenRFIDReader) {
      this.uartBaudRateValue = await this.rfidService.getDeviceParam(7).toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      });
    }

    this.isLoading = false;
  }

  onSubmit(form: NgForm) {
    this.updateDeviceParam(form);
  }

  async updateDeviceParam(form: NgForm) {

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
    this.isOpenRFIDReader = true;
    this.successMessage = "";
    this.isLoading = true;
    this.rfidService.openRFIDCardReader().subscribe((data: any) => {
      this.isLoading = false;
      this.successMessage = data.message
      this.isSuccessful = true;
    }, error => {
      if (error){
        this.isSuccessful = false;
        this.errorMessage = this.ERROR_CONNECT_DISCONNECT
      }
    });
  }

  clearFields(form : NgForm){
    form.reset();
  }

  closeRFIDCardReader(){
    this.isOpenRFIDReader = false;
    this.successMessage = "";
    this.isLoading = true;
    this.rfidService.closeRFIDCardReader().subscribe((data: any) => {

      this.isLoading = false;
      this.isSuccessful = true;
      if (data){
        this.successMessage = data.message
      }
    }, error => {
    });
  }
}


