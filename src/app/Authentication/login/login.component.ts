import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import {LoginService} from "./login.service";



function sleep(milliseconds : any) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const isRoute = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoading = false;
  isLoginFailed = false;
  isRouteToHome = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router : Router,
              private loginService : LoginService ) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if (this.isLoggedIn){
      this.isLoading = true;
      sleep(2000);
      this.router.navigate(['/home']);
    }
  }

  onSubmit(form: NgForm) {

    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username , password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isLoading = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    );
  }

  reloadPage() {
    window.location.reload()
  }

}
