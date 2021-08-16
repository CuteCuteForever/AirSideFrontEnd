import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EPCActiveModel} from "./epc-active.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ViewActiveScanService {

  constructor(private http: HttpClient) { }

  getViewActiveScan(){
    return this.http.get<EPCActiveModel[]>(REST_API_SERVER+'viewActiveScan');
  }

}
