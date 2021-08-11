import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './Authentication/profile/profile.component';
import { BoardUserComponent } from './Authentication/board-user/board-user.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HeaderComponent } from './header/header.component';
import { authInterceptorProviders } from './Authentication/_helpers/auth.interceptor';
import {BillingInformationComponent} from "./airside/billing-information/billing-information.component";
import {VehicleInformationComponent} from "./airside/vehicle-information/vehicle-information.component";
import {RFIDComponent} from "./airside/rfid/rfid.component";
import {CustomerInformationComponent} from "./airside/customer-information/customer-information.component";
import {AntennaComponent} from "./airside/antenna/antenna.component";
import {CompanyInformationComponent} from "./airside/company-information/company-information.component";
import {VehiclestatusComponent} from "./airside/vehicle-information/vehiclestatus/vehiclestatus.component";
import {TransactionComponent} from "./home/transaction/transaction.component";
import { SignaturePadModule } from 'angular2-signaturepad';
import {LoadingSpinnerComponent} from "./helper/loading-spinner.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./angular-material.module";
import {VehicleInformationResolve} from "./airside/vehicle-information/vehicle-information.resolve";
import {AdminComponent} from "./admin/admin.component";
import {AddCompanyComponent} from "./admin/add-company/add-company.component";
import {BorrowTransponderComponent} from "./admin/borrow-transponder/borrow-transponder.component";
import {CommonModule} from "@angular/common";
import { NgSelectModule } from '@ng-select/ng-select';
import {AddVehicleComponent} from "./admin/add-vehicle/add-vehicle.component";
import {AddTransponderComponent} from "./admin/register-transponder/register-transponder.component";
import {ReturnTransponderComponent} from "./admin/return-transponder/return-transponder.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {SmallLoadingSpinnerComponent} from "./helper/small-loading-spinner.component";
import {ViewTransponderComponent} from "./admin/view-transponder/view-transponder.component";
import {ViewTransponderResolve} from "./admin/view-transponder/view-transponder.resolve";
import {BorrowReturnTransponderStatusComponent} from "./admin/borrow-return-transponder-status/borrow-return-transponder-status.component";
import {ViewBorrowReturnResolve} from "./admin/borrow-return-transponder-status/view-borrow-return.resolve";
import { CustomFormsModule } from 'ng2-validation'
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    RegisterComponent,
    HeaderComponent,
    AppComponent,
    BillingInformationComponent,
    RFIDComponent,
    AntennaComponent,
    CustomerInformationComponent,
    VehicleInformationComponent,
    CompanyInformationComponent,
    VehiclestatusComponent,
    HomeComponent,
    TransactionComponent,
    LoadingSpinnerComponent,
    AdminComponent,
    AddCompanyComponent,
    AddTransponderComponent,
    BorrowTransponderComponent,
    AddVehicleComponent,
    ReturnTransponderComponent,
    SmallLoadingSpinnerComponent,
    ViewTransponderComponent,
    BorrowReturnTransponderStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SignaturePadModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    NgSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    NgbModule
  ],
  providers: [authInterceptorProviders , VehicleInformationResolve, ViewTransponderResolve,ViewBorrowReturnResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
