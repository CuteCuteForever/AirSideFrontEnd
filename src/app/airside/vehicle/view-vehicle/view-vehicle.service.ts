import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {VehicleCompanyModel} from "./vehicle-company.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ViewVehicleCompanyService {

  constructor(private http: HttpClient) { }

  getVehicleCompany(){
    return this.http.get<VehicleCompanyModel[]>(REST_API_SERVER+'vehicleCompanyInfos');
  }

}
