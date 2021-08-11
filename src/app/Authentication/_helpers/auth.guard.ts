import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";

//this class is use for Router Guard
@Injectable( {providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(private tokenStorageService: TokenStorageService , private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot , router : RouterStateSnapshot) : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
    const isAuth = !!this.tokenStorageService.getToken()

    if (isAuth){
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }

}
