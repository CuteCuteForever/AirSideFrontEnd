import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TransponderModel} from "./transponder.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class DeleteTransponderService {

  constructor(private http: HttpClient) { }

  deleteTransponder(transponderModel : TransponderModel){
    return this.http.post<any>(REST_API_SERVER+'deleteTransponder' , transponderModel) ;
  }

  getTransponders(){
    return this.http.get<TransponderModel[]>(REST_API_SERVER+'transpondersInfos');
  }

}
