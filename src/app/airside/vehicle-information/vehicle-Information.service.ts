import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {VehicleCompany} from "./vehicle.model";
import {delay} from "rxjs/operators";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class VehicleInformationService {

  constructor(private http: HttpClient) { }

  getVehicles(){
     return this.http.get<VehicleCompany[]>(REST_API_SERVER+'vehicleCompanyInfos');
  }

}
