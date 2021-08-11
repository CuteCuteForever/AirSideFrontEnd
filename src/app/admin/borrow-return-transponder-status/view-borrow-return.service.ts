import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BorrowReturnModel} from "./borrowReturn.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ViewBorrowerReturnService {

  constructor(private http: HttpClient) { }

  getBorrowReturnTransponderStatus(){
    return this.http.get<BorrowReturnModel[]>(REST_API_SERVER+'borrowreturntransponderstatusInfos');
  }

}
