import {TransponderStatusModel} from "./transponder-status.model";
import {ViewTransponderStatusService} from "./view-transponder-status.service";
import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class ViewTransponderStatusResolve implements Resolve<TransponderStatusModel[]> {

  constructor(private viewTransponderStatusService: ViewTransponderStatusService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<TransponderStatusModel[]> {

    return this.viewTransponderStatusService.getTransponderStatusView()
  }
}
