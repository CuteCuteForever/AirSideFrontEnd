import { Injectable } from '@angular/core';
import {CompanyModel} from "../vehicle/update-vehicle/company.model";
import {HttpClient} from "@angular/common/http";
import {VehicleCompanyModel} from "../vehicle/view-vehicle/vehicle-company.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminFormService {

  constructor(private http: HttpClient) { }

  getUniqueCompany(){
    return this.http.get<CompanyModel[]>(REST_API_SERVER+'uniqueCompany');
  }

  getVehicleCompany(companyId : string){
    return this.http.get<VehicleCompanyModel>(REST_API_SERVER+'vehicleCompany'+"/"+companyId);
  }

}
