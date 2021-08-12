import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {Vehicle} from "./vehicle.model";
import {Transponder} from "./transponder.model";
import {Company} from "./company.model";

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
    return this.http.get<Company[]>(REST_API_SERVER+'companyInfos');
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



  insertTranponderStatus(jsonTranspondersArray : any){
    return this.http.post<any>(REST_API_SERVER+'insertborrowtransponder', jsonTranspondersArray, {headers: headers}) ;
  }

}
