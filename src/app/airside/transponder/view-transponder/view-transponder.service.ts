import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Transponder} from "./transponder.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ViewTransponderService {

  constructor(private http: HttpClient) { }

  getTransponders(){
    return this.http.get<Transponder[]>(REST_API_SERVER+'transpondersInfos');
  }

}
