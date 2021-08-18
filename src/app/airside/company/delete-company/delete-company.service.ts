import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CompanyModel} from "./company.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class DeleteCompanyService {

  constructor(private http: HttpClient) { }

  message : string ="";

  deleteCompany(companyModel : CompanyModel){
    return this.http.post<any>(REST_API_SERVER+'deleteCompany' , companyModel) ;
  }

  getCompany(){
    return this.http.get<CompanyModel[]>(REST_API_SERVER+'companyInfos');
  }

}
