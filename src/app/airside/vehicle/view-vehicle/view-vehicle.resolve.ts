import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ViewVehicleCompanyService } from "./view-vehicle.service";
import {VehicleCompanyModel} from "./vehicle-company.model";

@Injectable()
export class VehicleCompanyResolve implements Resolve<VehicleCompanyModel[]> {

  constructor(private viewVehicleCompanyService: ViewVehicleCompanyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VehicleCompanyModel[]> {
    return this.viewVehicleCompanyService.getVehicleCompany();
  }
}
