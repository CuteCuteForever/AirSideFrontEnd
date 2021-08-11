import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {CompanyTransponder} from "../register-transponder/company-transponder.model";
import {Vehicle} from "./vehicle.model";
import {BorrowTransponder} from "./borrowTransponder.model";
import {Transponder} from "./transponder.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class BorrowTransponderService {


  isRemoveFirstRow = false;
  transponderSubject = new Subject<Transponder[]>();

  private transponderArray: Transponder[] = [
    new Transponder("1" , "E20030340404010", "BRAVO" , "DescriptionAAA" , "valid", "111-222",  new Date("2021-08-11 19:29:35.000000"), "Working"),
    new Transponder("2" , "E20030340404011", "Charlie" , "DescriptionBBB" , "valid", "111-222",  new Date("2021-08-11 19:29:35.000000"), "Working")
    /*new EPC("E20030340404010", "BRAVO" , "111-222")
    new EPC("E20030340404011", "BRAVO" , "111-222"),
    new EPC("E20030340404012", "BRAVO" , "111-222"),
    new EPC("E20030340404013", "BRAVO" , "111-222"),
    new EPC("E20030340404014", "BRAVO" , "111-222"),
    new EPC("E20030340404015", "BRAVO" , "111-222"),
    new EPC("E20030340404016", "BRAVO" , "111-222"),
    new EPC("E20030340404017", "BRAVO" , "111-222"),
    new EPC("E20030340404018", "BRAVO" , "111-222"),
    new EPC("E20030340404019", "BRAVO" , "111-222"),
    new EPC("E20030340404020", "BRAVO" , "111-222"),
    new EPC("E20030340404021", "BRAVO" , "111-222"),
    new EPC("E20030340404022", "BRAVO" , "111-222"),
    new EPC("E20030340404023", "BRAVO" , "111-222"),
    new EPC("E20030340404024", "BRAVO" , "111-222"),
    new EPC("E20030340404025", "BRAVO" , "111-222"),
    new EPC("E20030340404026", "BRAVO" , "111-222"),
    new EPC("E20030340404027", "BRAVO" , "111-222")*/
  ];

  constructor(private http: HttpClient) { }

  scanEPC(){
    return this.http.get<Transponder>(REST_API_SERVER+'rfidscan');
  }

  checkBorrowedTransponderExistInDB(epcNumber : string , rowRecordStatus : string){
    return this.http.get(REST_API_SERVER+'getborrowedtransponder/'+epcNumber+"/"+rowRecordStatus);
  }

  getTransponderByEPCAndRowRecordStatus(epcNumber : string , rowRecordStatus : string){
    return this.http.get(REST_API_SERVER+'gettransponderbyepc/'+epcNumber+"/"+rowRecordStatus);
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


  isEPCFoundInFrontEndArray(epcStr : string): boolean {

    let isFound : boolean = false;
    this.transponderArray.forEach( (transponder : Transponder) => {

      let epcNumber : string = transponder.epc
      console.log(epcNumber)

      if (epcNumber === epcStr){
        isFound = true;
      }
    });

    console.log(isFound)
    return isFound;
  }

  getCompany(){
    return this.http.get<CompanyTransponder[]>(REST_API_SERVER+'companyInfos');
  }

  getVehicle(){
    return this.http.get<Vehicle[]>(REST_API_SERVER+'vehicleInfos');
  }

  deleteEPC(index: number) {
    this.transponderArray.splice(index, 1);
    this.transponderSubject.next(this.transponderArray.slice());
  }

  getTransponderIDByEPC(epcNumber : string){
    return this.http.get(REST_API_SERVER+'gettransponderbyepc/'+epcNumber);
  }

  insertTranponderBorrower(jsonTranspondersArray : string){
    return this.http.post<any>(REST_API_SERVER+'insertBorrowTransponder', jsonTranspondersArray) ;
  }

}
