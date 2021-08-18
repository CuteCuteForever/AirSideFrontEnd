import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Company} from "./company.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AddCompanyService {

  constructor(private http: HttpClient) { }

   message : string ="";

  insertCompany(companyModel : Company){
    return this.http.post<any>(REST_API_SERVER+'insertCompany' , companyModel) ;
  }


}
