import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {TransponderModel} from "./transponder.model";
import {ViewTransponderService} from "./view-transponder.service";

@Injectable()
export class ViewTransponderResolve implements Resolve<TransponderModel[]> {

  constructor(private transponderService: ViewTransponderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<TransponderModel[]> {
    return this.transponderService.getTransponders()
  }
}
