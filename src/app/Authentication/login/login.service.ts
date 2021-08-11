import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

const REST_API_SERVER = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

}

