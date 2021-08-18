import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RfidService {
  get desktopReaderConnectedStatusEmitter(): Subject<boolean> {
    return this._desktopReaderConnectedStatusEmitter;
  }

  set desktopReaderConnectedStatusEmitter(value: Subject<boolean>) {
    this._desktopReaderConnectedStatusEmitter = value;
  }

  public isRFIDConnected = false;
  public transportValue: string;
  public workModeValue: string;
  public deviceAddressValue: string;
  public filterTimeValue: string;
  public rfPowerValue: string;
  public beepEnableValue: string;
  public uartBaudRateValue: string;

  private _desktopReaderConnectedStatusEmitter = new Subject<boolean>();

  private _REST_API_SERVER = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this._REST_API_SERVER);
  }

  getDeviceParam(index : number) {
    return this.httpClient.get(this._REST_API_SERVER+"rfidReadDeviceOneParam/"+index);
  }

  updateDeviceParam(index : number , value : number) {
    return this.httpClient.get(this._REST_API_SERVER+"rfidUpdateDeviceOneParam/"+index+"/"+value);
  }

  openRFIDCardReader(){
    this.isRFIDConnected = true;
    return this.httpClient.get(this._REST_API_SERVER+"rfidopen");
  }

  closeRFIDCardReader(){
    return this.httpClient.get(this._REST_API_SERVER+"rfidclose");
  }

}
