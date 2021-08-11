import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  form: any = {};
  isSuccessfulRegister = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      (data : any) => {
        console.log(data);
        this.isSuccessfulRegister = true;
        this.isSignUpFailed = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.isSignUpFailed = true;
      }
    );
  }

}
