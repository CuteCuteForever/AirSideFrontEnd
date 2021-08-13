import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Vehicle} from "./vehicle.model";
import {Company} from "./company.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AddVehicleService {

  constructor(private http: HttpClient) { }

  getCompany(){
    return this.http.get<Company[]>(REST_API_SERVER+'companyInfos');
  }

  insertVehicle(vehicle : Vehicle){
    console.log(vehicle)
    return this.http.post<any>(REST_API_SERVER+'insertVehicle' , vehicle) ;
  }

  checkVehicleExistInDB(registrationNumber : string , rowRecordStatus : string) {
    return this.http.get<Company[]>(REST_API_SERVER+'vehicle'+"/"+registrationNumber+"/"+rowRecordStatus);
  }

}
