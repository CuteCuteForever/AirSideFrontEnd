import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { EPCPassiveModel } from "./epc-passive.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ViewPassiveScanService {

  constructor(private http: HttpClient) { }

  getViewPassiveScan(){
    return this.http.get<EPCPassiveModel[]>(REST_API_SERVER+'viewPassiveScan');
  }

}
