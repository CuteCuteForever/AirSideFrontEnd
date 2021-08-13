import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TransponderStatusModel} from "./transponder-status.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ViewTransponderStatusService {

  constructor(private http: HttpClient) { }

  getTransponderStatusView(){
    return this.http.get<TransponderStatusModel[]>(REST_API_SERVER+'transponderstatusview');
  }

}
