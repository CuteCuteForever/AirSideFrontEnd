import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AntennaService {

  private REST_API_SERVER = "http://localhost:8080/";

  private _isOpenAntenna = false;

  antennaConnectedStatusEmitter = new Subject<boolean>();

  public comPortValue : string = "";
  public serialNumberValue: string;
  public versionInformationValue: string;
  public rfPowerValue: string;
  public drmValue: string;
  public beepStatusValue: string;
  public readerTemperatureValue: string;
  public measureReturnLossValue: string;
  public baudRateValue: string;

  constructor(private httpClient: HttpClient) { }

   public getIsOpenAntenna(): boolean {
    return this._isOpenAntenna;
  }

  public setIsOpenAntenna(value: boolean) {
    this._isOpenAntenna = value;
  }

  public getComPortValue(){
    return this.comPortValue;
  }

  public setComPortValue( comPortValue : string){
    return this.comPortValue = comPortValue;
  }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  startActiveContinousScanning(){
    return this.httpClient.get(this.REST_API_SERVER+"AsyncAntennaActiveStartscan");
  }


  startPassiveContinousScanning(){
    return this.httpClient.get(this.REST_API_SERVER+"AsyncAntennaPassiveStartscan");
  }


  startPassiveScan( isPassiveAntennaOne : boolean , isPassiveAntennaTwo : boolean , isPassiveAntennaThree : boolean , isPassiveAntennaFour : boolean){
    return this.httpClient.get(this.REST_API_SERVER+"passiveScan"+"/"+isPassiveAntennaOne +"/"+isPassiveAntennaTwo+"/"+isPassiveAntennaThree+"/"+isPassiveAntennaFour  );
  }

  stopPassiveScan(){
    return this.httpClient.get(this.REST_API_SERVER+"stopPassiveScan");
  }

  startActiveScan( isActiveAntennaOne : boolean , isActiveAntennaTwo : boolean , isActiveAntennaThree : boolean , isActiveAntennaFour : boolean){
    return this.httpClient.get(this.REST_API_SERVER+"activeScan"+"/"+isActiveAntennaOne +"/"+isActiveAntennaTwo+"/"+isActiveAntennaThree+"/"+isActiveAntennaFour  );
  }

  stopActiveScan(){
    return this.httpClient.get(this.REST_API_SERVER+"stopActiveScan");
  }

  stopContinousScanning(){
    return this.httpClient.get(this.REST_API_SERVER+"antennastopcontinuousscan");
  }

  offAlarm(){
    return this.httpClient.get(this.REST_API_SERVER+"offAlertSound");
  }

  openAntenna(comPort : string){
    return this.httpClient.get(this.REST_API_SERVER+"openAntenna/"+comPort);
  }

  closeAntenna(){
    return this.httpClient.get(this.REST_API_SERVER+"closeAntenna");
  }

  getSerialNumber(){
    return this.httpClient.get(this.REST_API_SERVER+"getSerialNumber");
  }

  getVersionInformation(){
  return this.httpClient.get(this.REST_API_SERVER+"getVersionInfo");
  }

  getRFPower(){
    return this.httpClient.get(this.REST_API_SERVER+"getRfPower");
  }

  getDRM(){
    return this.httpClient.get(this.REST_API_SERVER+"getdrm");
  }

  getBeepStatus(){
    return this.httpClient.get(this.REST_API_SERVER+"getbeepstatus");
  }

  getReaderTemperature(){
    return this.httpClient.get(this.REST_API_SERVER+"getreadertemperature");
  }

  setBeepStatus(value : number){
    return this.httpClient.get(this.REST_API_SERVER+"setbeepstatus/"+value);
  }

  setDRM( value : number){
    return this.httpClient.get(this.REST_API_SERVER+"setdrm/"+value);
  }

  setRFPower( value : number){
    return this.httpClient.get(this.REST_API_SERVER+"setrfpower/"+value);
  }

}
