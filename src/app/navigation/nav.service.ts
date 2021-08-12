import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class NavService {
    // @ts-ignore
  public currentUrl = new BehaviorSubject<string>(undefined);

    constructor(private router: Router , private http: HttpClient) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }



  closeRFIDCardReader() {

    let REST_API_SERVER = 'http://localhost:8080/';

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
