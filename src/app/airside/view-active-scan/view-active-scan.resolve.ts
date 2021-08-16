import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {EPCActiveModel} from "./epc-active.model";
import {ViewActiveScanService} from "./view-active-scan.service";

@Injectable()
export class ViewActiveScanResolve implements Resolve<EPCActiveModel[]> {

  constructor(private viewActiveScanService: ViewActiveScanService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EPCActiveModel[]> {
    return this.viewActiveScanService.getViewActiveScan()
  }
}
