import {Component, OnChanges, OnInit} from '@angular/core';
import {AntennaService} from "./antenna.service";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import * as myGlobals from '../../helper/globals';

@Component({
  selector: 'app-antenna-one',
  templateUrl: './antenna.component.html',
  styleUrls: ['./antenna.component.css']
})
export class AntennaComponent implements OnInit {

  constructor(private antennaService: AntennaService) {
  }

  isLoading = false;
  isPassiveConfig = false;

  isPassiveAntennaOne =  false
  isPassiveAntennaTwo=  false
  isPassiveAntennaThree=  false
  isPassiveAntennaFour =  false

  isActiveAntennaOne=  false
  isActiveAntennaTwo=  false
  isActiveAntennaThree=  false
  isActiveAntennaFour =  false

  isOpenAntenna = false;
  isPassiveScanning = false;
  isActiveScanning = false;

  isSuccessful = false;
  isError = false;
  successMessage: string = "";
  errorMessage : string ="";

  comPortValue : string = "";
  serialNumberValue: string;
  versionInformationValue: string;
  rfPowerValue: string;
  drmValue: string;
  beepStatusValue: string;
  readerTemperatureValue: string;
  measureReturnLossValue: string;
  baudRateValue: string;

  ngOnInit(): void {
   this.comPortValue = this.antennaService.getComPortValue();
   this.isOpenAntenna=  this.antennaService.getIsOpenAntenna();

    this.serialNumberValue = this.antennaService.serialNumberValue
    this.versionInformationValue = this.antennaService.versionInformationValue
    this.rfPowerValue = this.antennaService.rfPowerValue
    this.drmValue = this.antennaService.drmValue
    this.beepStatusValue = this.antennaService.beepStatusValue
    this.readerTemperatureValue = this.antennaService.readerTemperatureValue

  }

  getData(){
    this.clearErrorMessage()
    this.clearSuccessMessage()
    this.getAntennaParam();
    this.setSuccessMessage("Successfully Refresh Data");
    this.isLoading = false;
  }

  async getAntennaParam() {

    this.isLoading = true;
    this.clearErrorMessage()
    this.clearSuccessMessage()

    if (this.isOpenAntenna) {
      this.serialNumberValue = await this.antennaService.getSerialNumber().toPromise().then((result: any) => {
        if(result) {
          this.antennaService.serialNumberValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(error.error.message)
      });
    }

    if (this.isOpenAntenna) {
      this.versionInformationValue = await this.antennaService.getVersionInformation().toPromise().then((result: any) => {
        if(result) {
          this.antennaService.versionInformationValue= result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(error.error.message)
      });
    }

    if (this.isOpenAntenna) {
      this.rfPowerValue = await this.antennaService.getRFPower().toPromise().then((result: any) => {
        if(result) {
          this.antennaService.rfPowerValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(error.error.message)
      });
    }


    if (this.isOpenAntenna) {
      this.drmValue = await this.antennaService.getDRM().toPromise().then((result: any) => {
        if(result) {
          this.antennaService.drmValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(error.error.message)
      });
    }


    if (this.isOpenAntenna) {
      this.beepStatusValue = await this.antennaService.getBeepStatus().toPromise().then((result: any) => {
        if(result) {
          this.antennaService.beepStatusValue  = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(error.error.message)
      });
    }

    if (this.isOpenAntenna) {
      this.readerTemperatureValue = await this.antennaService.getReaderTemperature().toPromise().then((result: any) => {
        if(result) {
          this.antennaService.readerTemperatureValue = result.message
          return result.message
        }
      }, (error : any) => {
        this.setErrorMessage(error.error.message)
      });
    }

  }

  onSubmit(form: NgForm) {
    this.updateDeviceParam(form);
  }

  async updateDeviceParam(form: NgForm) {

    this.isLoading = true;
    this.clearSuccessMessage();
    this.clearErrorMessage()

    await this.antennaService.setBeepStatus(form.value.beepStatus).toPromise()
    await this.antennaService.setDRM(form.value.drm).toPromise();
    await this.antennaService.setRFPower(form.value.rfPower).toPromise()

    this.setSuccessMessage("Successfully Updated.")
    this.isLoading = false;
  }

  offAlarm() {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    this.antennaService.offAlarm().subscribe((data: any) => {
      this.setSuccessMessage(data.message)
      this.isOpenAntenna = true
    }, (error: any) => {
    });

    this.isLoading = false
  }

  startPassiveScan(){

    this.clearErrorMessage();
    this.clearSuccessMessage();

    if (!this.isPassiveAntennaOne && !this.isPassiveAntennaTwo && !this.isPassiveAntennaThree && !this.isPassiveAntennaFour) {
      this.setErrorMessage("Please select at least one antenna!")
    }else {
      this.isPassiveScanning = true
      this.antennaService.startPassiveScan(this.isPassiveAntennaOne, this.isPassiveAntennaTwo, this.isPassiveAntennaThree, this.isPassiveAntennaFour).subscribe()
      this.setSuccessMessage("Antenna Passive Scan Initiated")
    }
  }

  stopPassiveScan(){

    this.clearErrorMessage();
    this.clearSuccessMessage();

    this.isPassiveScanning = false
    this.antennaService.stopPassiveScan().subscribe()
    this.setSuccessMessage("Antenna Passive Scan Initiated")
  }

  startActiveScan(){

    this.clearErrorMessage();
    this.clearSuccessMessage();

    this.isActiveScanning = true
    this.antennaService.startActiveScan(this.isActiveAntennaOne, this.isActiveAntennaTwo , this.isActiveAntennaThree , this.isActiveAntennaFour).subscribe()
    this.setSuccessMessage("Antenna Active Scan Initiated")
  }

  stopActiveScan(){
    this.clearErrorMessage();
    this.clearSuccessMessage();

    this.isActiveScanning = false
    this.antennaService.stopActiveScan().subscribe();
    this.setSuccessMessage("Stop Antenna Active Scan successfully")
  }

  connectAntenna(form: NgForm) {

    this.clearErrorMessage();
    this.clearSuccessMessage();

    if (this.comPortValue === "") {
      this.setErrorMessage("Please insert ComPort value first");
    } else {

      this.isLoading = true;

      this.antennaService.openAntenna(this.comPortValue).subscribe((data: any) => {
        this.setSuccessMessage(data.message)
        this.isLoading = false;
        this.isOpenAntenna = true
        this.antennaService.setIsOpenAntenna(true);
        this.antennaService.antennaConnectedStatusEmitter.next(true);
        this.antennaService.setComPortValue(this.comPortValue)
      }, (error: any) => {
        this.setErrorMessage("Error occurred. Please disconnect and connect Antenna again.")
        this.isLoading = false;
      });
    }
  }

  disconnectAntenna(){

    this.clearErrorMessage()
    this.clearSuccessMessage()

    this.antennaService.closeAntenna().subscribe((data: any) => {
      this.isLoading = false;
      this.setSuccessMessage(data.message)
      this.isOpenAntenna = true;
      this.antennaService.antennaConnectedStatusEmitter.next(false);
    }, (error : any) => {
      if (error.error.message) {
        this.setErrorMessage(error.error.message)
      } else {
        this.setErrorMessage("Error Occurred. Please re-connect again.")
      }
    });

  }

  clearFields(form : NgForm){
    this.clearErrorMessage();
    this.clearSuccessMessage();

    form.reset();
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

