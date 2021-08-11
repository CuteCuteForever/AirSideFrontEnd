import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AntennaService} from "./antenna.service";

@Component({
  selector: 'app-antenna',
  templateUrl: './antenna.component.html',
  styleUrls: ['./antenna.component.css']
})
export class AntennaComponent implements OnInit {

  constructor(private antennaService: AntennaService, private httpClient: HttpClient) {
  }

  isLoading = false;
  isSuccessful = true;
  isOpenAntenna = false;
  isContinuousScanning = false;

  successMessage: string = "";
  errorMessage : string ="";

  comPortValue : string
  serialNumberValue: string;
  versionInformationValue: string;
  rfPowerValue: string;
  drmValue: string;
  beepStatusValue: string;
  readerTemperatureValue: string;
  measureReturnLossValue: string;
  baudRateValue: string;


  ngOnInit(): void {
    this.isLoading = false;
  }

  getData(){
    this.getAntennaParam();
    this.successMessage = "Successfully Refresh Data";
    this.isLoading = false;
  }

  async getAntennaParam() {

    this.isLoading = true;

    if (this.isOpenAntenna) {
      this.serialNumberValue = await this.antennaService.getSerialNumber().toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        console.log(error.message)
        this.errorMessage = error.message
      });
    }

    if (this.isOpenAntenna) {
      this.versionInformationValue = await this.antennaService.getVersionInformation().toPromise().then((result: any) => {
        if(result) {
          console.log(result.message)
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        console.log(error.message)
        this.errorMessage = error.message
      });
    }

    if (this.isOpenAntenna) {
      this.rfPowerValue = await this.antennaService.getRFPower().toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        console.log(error.message)
        this.errorMessage = error.message
      });
    }


    if (this.isOpenAntenna) {
      this.drmValue = await this.antennaService.getDRM().toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        console.log(error.message)
        this.errorMessage = error.message
      });
    }


    if (this.isOpenAntenna) {
      this.beepStatusValue = await this.antennaService.getBeepStatus().toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        console.log(error.message)
        this.errorMessage = error.message
      });
    }

    if (this.isOpenAntenna) {
      this.readerTemperatureValue = await this.antennaService.getReaderTemperature().toPromise().then((result: any) => {
        if(result) {
          return result.message
        }
      }, (error : any) => {
        this.isSuccessful = false
        console.log(error.message)
        this.errorMessage = error.message
      });
    }

  }

  onSubmit(form: NgForm) {
    this.updateDeviceParam(form);
  }

  async updateDeviceParam(form: NgForm) {

    this.isLoading = true;
    this.successMessage = "";

    await this.antennaService.setBeepStatus(form.value.beepStatus).toPromise()
    await this.antennaService.setDRM(form.value.drm).toPromise();
    await this.antennaService.setRFPower(form.value.rfPower).toPromise()

    this.successMessage ="Successfully Updated."
    this.isSuccessful = true;
    this.isLoading = false;
  }

  offAlarm() {
    this.antennaService.offAlarm().subscribe((data: any) => {
      this.isLoading = false;
      this.successMessage = data.message
      this.isSuccessful = true;
      this.isOpenAntenna = true
    }, (error: any) => {
      this.isSuccessful = false;
      this.isLoading = false;
    });
  }

  startContinousScanning(){
    this.isContinuousScanning = true
    this.antennaService.startContinousScanning().subscribe()
    this.successMessage = "Antenna Continuous Scan Initiated"
  }

  stopContinousScanning(){
    this.isContinuousScanning = false;
    this.antennaService.stopContinousScanning().subscribe();
    this.successMessage = "Stop Antenna Continuous Scan successfully"
  }

  openAntenna(form: NgForm) {

    this.successMessage = "";
    this.isLoading = true;

    this.antennaService.openAntenna(this.comPortValue).subscribe((data: any) => {
      this.isLoading = false;
      this.successMessage = data.message
      this.isSuccessful = true;
      this.isOpenAntenna = true
    }, (error : any) => {

      this.errorMessage = "Error occurred. Please disconnect and connect Antenna again."

      this.isSuccessful = false;
      this.isLoading = false;
    });
  }

  closeAntenna(){
    this.isOpenAntenna = false;
    this.antennaService.closeAntenna().subscribe((data: any) => {
      this.isLoading = false;
      this.isSuccessful = true;
      if (data.message){
        this.successMessage = data.message
      }
    }, error => {
    });
  }

  clearFields(form : NgForm){
    form.reset();
  }

}


