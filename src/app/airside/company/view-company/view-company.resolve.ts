import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CompanyModel } from "./company.model";
import {ViewCompanyService} from "./view-company.service";

@Injectable()
export class ViewCompanyResolve implements Resolve<CompanyModel[]> {

  constructor(private viewCompanyService: ViewCompanyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CompanyModel[]> {
    return this.viewCompanyService.getCompany()
  }
}
