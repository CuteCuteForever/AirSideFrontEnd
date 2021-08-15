import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {Vehicle} from "./vehicle.model";
import {TransponderModel} from "./transponder.model";
import {Company} from "./company.model";

const REST_API_SERVER = 'http://localhost:8080/';
const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class TransponderStatusService {

  isRemoveFirstRow = false;
  transponderSubject = new Subject<TransponderModel[]>();

  private transponderArray: TransponderModel[] = [
   // new TransponderModel("2" , "BRAVO", "1111-2222" , "Not Spare" , "Used for airside", new Date("2021-08-25 16:00:00.000000"), "E20030340404010", "valid" , new Date()),
  ];

  constructor(private http: HttpClient) { }

   scanEPC(){
    return this.http.get<TransponderModel>(REST_API_SERVER+'rfidScanTransponderStatus');
  }

  getTransponderArray() {
    return this.transponderArray.slice();
  }

  addTransponderToTransponderModelArray(transponder : TransponderModel){

    if (!this.isRemoveFirstRow){
      this.transponderArray.splice(0, 1);
      this.isRemoveFirstRow = true;
    }

    this.transponderArray.push( transponder);
    this.transponderSubject.next(this.transponderArray.slice());
  }

  getCompany(){
    return this.http.get<Company[]>(REST_API_SERVER+'companyInfos');
  }

  getVehicle(){
    return this.http.get<Vehicle[]>(REST_API_SERVER+'vehicleInfos');
  }

  deleteEPC(index: number) {
    this.transponderArray.splice(index, 1);
    this.transponderSubject.next(this.transponderArray.slice());
  }

  insertBorrowTransponderStatus(jsonTranspondersArray : any){
    return this.http.post<any>(REST_API_SERVER+'insertBorrowTransponder', jsonTranspondersArray, {headers: headers}) ;
  }

}
