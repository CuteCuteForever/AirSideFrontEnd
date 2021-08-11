import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(private http: HttpClient) {
  }

  closeRFIDCardReader() {
    console.log("Tryhinmg to close")
    this.http.get(REST_API_SERVER + 'rfidclose').subscribe(
      (data: any) => {
        console.log("ss"+data);
      },
      error => {
        console.log(error);
      }
    )
  }
}

