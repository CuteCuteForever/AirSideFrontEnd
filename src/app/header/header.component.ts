import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../Authentication/_services/token-storage.service';
import {LogOutService} from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  title = 'AirSide';
  private roles: string[] = [] ;
  isLoggedIn = false;
  isAdminRole = false;
  showModeratorBoard = false;
  username: string ="";

  constructor(private tokenStorageService: TokenStorageService , private logOutService: LogOutService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isAdminRole = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  logout() {
    this.logOutService.closeRFIDCardReader();

    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
