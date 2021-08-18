import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CompanyModel} from "./company.model";
import {VehicleModel} from "../update-vehicle/vehicle.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class DeleteVehicleService  {

  constructor(private http: HttpClient) { }

  getUniqueCompany(){
    return this.http.get<CompanyModel[]>(REST_API_SERVER+'uniqueCompany');
  }

  deleteVehicle( vehicle : VehicleModel){
    return this.http.post<any>(REST_API_SERVER+'deleteVehicle' , vehicle) ;
  }

  getVehicleByCompanyId( companyId : string | null){
    return this.http.get<any>(REST_API_SERVER+'vehicle'+"/"+companyId) ;
  }
}
