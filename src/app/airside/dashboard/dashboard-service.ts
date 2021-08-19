import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import { TransponderModel } from "./transponder.model";

// @ts-ignore
const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {

  }

  getBorrowedTransponderSize()  {
    return this.http.get<TransponderModel[]>(REST_API_SERVER+'borrowedTransponders');
  }

  getTranspondersNotSpareSize(){
    return this.http.get<TransponderModel[]>(REST_API_SERVER+'transponderNotSpare');
  }

  getTransponders(){
    return this.http.get<TransponderModel[]>(REST_API_SERVER+'transpondersInfos');
  }
}
