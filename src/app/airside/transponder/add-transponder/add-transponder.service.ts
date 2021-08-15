import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TransponderModel} from "./transponder.model";
import {Company} from "../../company/add-company/company.model";


const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AddTransponderService {

  constructor(private http: HttpClient) { }

  insertTransponder(transponderModel : TransponderModel){
    return this.http.post<any>(REST_API_SERVER+'insertTransponder' , transponderModel) ;
  }

  scanEPC(){
    return this.http.get(REST_API_SERVER+'rfidScanNewTransponder');
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
