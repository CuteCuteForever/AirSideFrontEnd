import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject, throwError} from 'rxjs';
import {VehicleCompany} from "../../airside/vehicle-information/vehicle.model";
import {Company} from "../add-company/company.model";
import {NgForm} from "@angular/forms";
import {Transponder} from "./transponder.model";
import {CompanyTransponder} from "./company-transponder.model";


const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class RegisterTransponderService {

  constructor(private http: HttpClient) { }

  insertTransponder(transponder : Transponder){
    return this.http.post<any>(REST_API_SERVER+'insertTransponder' , transponder) ;
  }

  scanEPC(){
    return this.http.get(REST_API_SERVER+'rfidscan');
  }

  getTransponderByEPCAndRowRecordStatus(epcNumber : string , rowRecordStatus : string){
    return this.http.get<any>(REST_API_SERVER+'gettransponderbyepc/' +epcNumber+"/"+rowRecordStatus) ;
  }

  getTransponderByCallSignAndRowRecordStatus(callSign : string ,  rowRecordStatus : string){
    return this.http.get<any>(REST_API_SERVER+'gettransponderbycallsign/'+callSign+"/"+rowRecordStatus) ;
  }

  updateTransponderStatus(epc : string , transponderStatus : string){
    return this.http.get<any>(REST_API_SERVER+'updatetransponderstatus'+"/"+epc+"/"+transponderStatus) ;
  }
}
