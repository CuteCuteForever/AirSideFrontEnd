import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { VehicleInformationService } from "./vehicle-Information.service";
import {VehicleCompany} from "./vehicle.model";

@Injectable()
export class VehicleInformationResolve implements Resolve<VehicleCompany[]> {

  constructor(private vehicleInformationService: VehicleInformationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VehicleCompany[]> {
    return this.vehicleInformationService.getVehicles();
  }
}
