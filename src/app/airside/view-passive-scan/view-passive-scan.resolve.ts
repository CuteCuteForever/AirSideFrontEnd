import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { EPCPassiveModel } from "./epc-passive.model";
import { ViewPassiveScanService } from "./view-passive-scan.service";

@Injectable()
export class ViewPassiveScanResolve implements Resolve<EPCPassiveModel[]> {

  constructor(private viewCompanyService: ViewPassiveScanService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EPCPassiveModel[]> {
    return this.viewCompanyService.getViewPassiveScan()
  }
}
