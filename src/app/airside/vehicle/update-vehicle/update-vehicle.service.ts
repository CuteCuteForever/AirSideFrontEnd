import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Company} from "./company.model";
import {Vehicle} from "./vehicle.model";
import {VehicleCompanyModel} from "../view-vehicle/vehicle-company.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getCompany(){
    return this.http.get<Company[]>(REST_API_SERVER+'companyInfos');
  }

  updateVehicle(vehicle : Vehicle){
    return this.http.post<any>(REST_API_SERVER+'updateVehicle' , vehicle) ;
  }

  getVehicleByCompanyId( companyId : number ){
    return this.http.get<any>(REST_API_SERVER+'vehicle'+"/"+companyId) ;
  }

  getVehicleCompany(){
    return this.http.get<VehicleCompanyModel[]>(REST_API_SERVER+'vehicleCompanyInfos');
  }
}
