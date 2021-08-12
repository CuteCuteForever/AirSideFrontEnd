import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {Transponder} from "./transponder.model";

const REST_API_SERVER = 'http://localhost:8080/';
const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class TransponderStatusService {

  isRemoveFirstRow = false;
  transponderSubject = new Subject<Transponder[]>();

  private transponderArray: Transponder[] = [
    new Transponder("2" , "BRAVO", "1111-2222" , "Not Spare" , "Used for airside", new Date("2021-08-25 16:00:00.000000"), "E20030340404010", "valid" , new Date()),
  ];

  constructor(private http: HttpClient) { }

  scanEPC(){
    return this.http.get<Transponder>(REST_API_SERVER+'rfidscan');
  }

  getTransponderArray() {
    return this.transponderArray.slice();
  }

  addTransponderToTransponderModelArray(transponder : Transponder){

    if (!this.isRemoveFirstRow){
      this.transponderArray.splice(0, 1);
      this.isRemoveFirstRow = true;
    }

    this.transponderArray.push( transponder);
    this.transponderSubject.next(this.transponderArray.slice());
  }


  deleteEPC(index: number) {
    this.transponderArray.splice(index, 1);
    this.transponderSubject.next(this.transponderArray.slice());
  }


  insertReturnTransponderStatus(jsonTranspondersArray : any){
    return this.http.post<any>(REST_API_SERVER+'insertreturntransponder', jsonTranspondersArray, {headers: headers}) ;
  }

}
