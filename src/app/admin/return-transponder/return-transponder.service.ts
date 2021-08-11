import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {ReturnTransponder} from "./returnTransponder.model";
import {ReturnEPC} from "./returnEPC.model";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ReturnTransponderService {

  isRemoveFirstRow = false;
  epcChangedArray = new Subject<ReturnEPC[]>();
  private epcArray: ReturnEPC[] = [
    new ReturnEPC("Please click Scan to return" , "")
  ];

  constructor(private http: HttpClient) { }

  scanEPC(){
    return this.http.get(REST_API_SERVER+'rfidscan');
  }


  getEPCs() {
    return this.epcArray.slice();
  }



  addEPC(epcNumber : string , callSign : string){

    if (!this.isRemoveFirstRow){
      this.epcArray.splice(0, 1);
      this.isRemoveFirstRow = true;
    }

    this.epcArray.push( new ReturnEPC(epcNumber , callSign));
    this.epcChangedArray.next(this.epcArray.slice());
  }

  deleteEPC(index: number) {
    this.epcArray.splice(index, 1);
    this.epcChangedArray.next(this.epcArray.slice());
  }


  getTransponderByEPCAndRowRecordStatus(epcNumber : string , rowRecordStatus : string){
    return this.http.get(REST_API_SERVER+'gettransponderbyepc/'+epcNumber+"/"+rowRecordStatus);
  }


  insertTranponderReturn(returnTransponder : ReturnTransponder){
    return this.http.post<any>(REST_API_SERVER+'insertReturnTransponder' , returnTransponder) ;
  }


  isEPCFoundInFrontEndArray(epcStr : string): boolean {

    let isFound : boolean = false;
    this.epcArray.forEach( (epcItem : ReturnEPC) => {

      let epcNumber : string = epcItem.epcNumber
      console.log(epcNumber)

      if (epcNumber === epcStr){
        isFound = true;
      }
    });

    console.log(isFound)
    return isFound;
  }

  updateBorrowedTransponderRowRecordStatus(epcNumber : string , rowRecordStatus : string) {
    return this.http.get(REST_API_SERVER+'updateborrowedtransponderrowrecordstatus'+"/"+epcNumber+"/"+rowRecordStatus ) ;
  }

  checkReturnedTransponderExistInDB(epcNumber : string , rowRecordStatus : string){
    return this.http.get(REST_API_SERVER+'getreturnedtransponder/'+epcNumber+"/"+rowRecordStatus);
  }

}
