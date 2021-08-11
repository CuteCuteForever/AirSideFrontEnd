import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AntennaService {

  private REST_API_SERVER = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  startContinousScanning(){
    return this.httpClient.get(this.REST_API_SERVER+"asyncantennastartscan");
  }

  stopContinousScanning(){
    return this.httpClient.get(this.REST_API_SERVER+"antennastopcontinuousscan");
  }

  offAlarm(){
    return this.httpClient.get(this.REST_API_SERVER+"offAlertSound");
  }

  openAntenna(comPort : string){
    return this.httpClient.get(this.REST_API_SERVER+"openantenna/"+comPort);
  }

  closeAntenna(){
    return this.httpClient.get(this.REST_API_SERVER+"closeantenna");
  }

  getSerialNumber(){
    return this.httpClient.get(this.REST_API_SERVER+"getserialnumber");
  }

  getVersionInformation(){
  return this.httpClient.get(this.REST_API_SERVER+"getversioninfo");
  }

  getRFPower(){
    return this.httpClient.get(this.REST_API_SERVER+"getrfpower");
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
