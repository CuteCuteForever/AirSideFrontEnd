import {Component, OnDestroy, OnInit} from '@angular/core';
import { TopNavItem } from './model/topNav-item';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { topMenu } from './model/topMenu';
import { middleMenu } from './model/middleMenu';
import { bottomMenu } from './model/bottomMenu';
import {TokenStorageService} from "../Authentication/_services/token-storage.service";
import {NavService} from "./nav.service";
import {MiddleNavItem} from "./model/middleNav-item";
import {BottomNavItem} from "./model/bottomNav-item";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy,OnInit {

  opened: boolean = true;
  mediaWatcher: Subscription;
  topMenu: TopNavItem[] = topMenu;
  middleMenu: MiddleNavItem[] = middleMenu;
  bottomMenu: BottomNavItem[] = bottomMenu;

  private roles: string[] = [] ;
  isLoggedIn = false;
  isAdminRole = false;
  showModeratorBoard = false;
  username: string ="";

  constructor(private navService : NavService , private media: MediaObserver , private tokenStorageService: TokenStorageService ) {
    this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    })
  }

  private handleMediaChange(mediaChange: MediaChange) {
   /* if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }*/
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isAdminRole = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  ngOnDestroy() {
    this.mediaWatcher.unsubscribe();
  }


  logout() {
    this.navService.closeRFIDCardReader();

    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
