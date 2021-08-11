import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {Transponder} from "./transponder.model";
import {ViewTransponderService} from "./view-transponder.service";

@Injectable()
export class ViewTransponderResolve implements Resolve<Transponder[]> {

  constructor(private transponderService: ViewTransponderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Transponder[]> {
    return this.transponderService.getTransponders()
  }
}
