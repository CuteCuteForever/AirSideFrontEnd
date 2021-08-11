import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {BorrowReturnModel} from "./borrowReturn.model";
import {ViewBorrowerReturnService} from "./view-borrow-return.service";

@Injectable()
export class ViewBorrowReturnResolve implements Resolve<BorrowReturnModel[]> {

  constructor(private viewBorrowerReturnService: ViewBorrowerReturnService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BorrowReturnModel[]> {
    return this.viewBorrowerReturnService.getBorrowReturnTransponderStatus()
  }
}
