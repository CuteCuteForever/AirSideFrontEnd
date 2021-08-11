import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RFIDServiceService {

  isRFIDConnected = false;

  private REST_API_SERVER = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  getDeviceParam(index : number) {
    return this.httpClient.get(this.REST_API_SERVER+"rfidreaddeviceoneparam/"+index);
  }

  updateDeviceParam(index : number , value : number) {
    return this.httpClient.get(this.REST_API_SERVER+"rfidupdatedeviceoneparam/"+index+"/"+value);
  }

  openRFIDCardReader(){
    this.isRFIDConnected = true;
    return this.httpClient.get(this.REST_API_SERVER+"rfidopen");
  }

  closeRFIDCardReader(){
    return this.httpClient.get(this.REST_API_SERVER+"rfidclose");
  }



}
