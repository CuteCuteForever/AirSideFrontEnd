import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './Authentication/register/register.component';
import { LoginComponent } from './Authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './Authentication/profile/profile.component';
import { BoardUserComponent } from './Authentication/board-user/board-user.component';
import {RFIDComponent} from "./airside/rfid/rfid.component";
import {TransponderComponent} from "./airside/transponder/transponder.component";
import {AntennaComponent} from "./airside/antenna/antenna.component";
import {TransactionComponent} from "./home/transaction/transaction.component";
import {CustomerInformationComponent} from "./airside/customer-information/customer-information.component";
import {AuthGuard} from "./Authentication/_helpers/auth.guard";
import {VehicleInformationComponent} from "./airside/vehicle-information/vehicle-information.component";
import {VehicleInformationResolve} from "./airside/vehicle-information/vehicle-information.resolve";
import {AdminComponent} from "./admin/admin.component";
import {AddCompanyComponent} from "./admin/add-company/add-company.component";
import {AddTransponderComponent} from "./admin/register-transponder/register-transponder.component";
import {BorrowTransponderComponent} from "./admin/borrow-transponder/borrow-transponder.component";
import {AddVehicleComponent} from "./admin/add-vehicle/add-vehicle.component";
import {ReturnTransponderComponent} from "./admin/return-transponder/return-transponder.component";
import {ViewTransponderComponent} from "./admin/view-transponder/view-transponder.component";
import {ViewTransponderResolve} from "./admin/view-transponder/view-transponder.resolve";
import {BorrowReturnTransponderStatusComponent} from "./admin/borrow-return-transponder-status/borrow-return-transponder-status.component";
import {ViewBorrowReturnResolve} from "./admin/borrow-return-transponder-status/view-borrow-return.resolve";


const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuard]},
  { path: 'addCompany', component: AddCompanyComponent , canActivate: [AuthGuard]},
  { path: 'addVehicle', component: AddVehicleComponent , canActivate: [AuthGuard]},
  { path: 'addTransponder', component: AddTransponderComponent , canActivate: [AuthGuard]},
  { path: 'borrowTransponder', component: BorrowTransponderComponent , canActivate: [AuthGuard]},
  { path: 'viewBorrowReturnTransponderStatus', component: BorrowReturnTransponderStatusComponent , canActivate: [AuthGuard] , resolve : {borrowReturnResolve:ViewBorrowReturnResolve}},
  { path: 'returnTransponder', component: ReturnTransponderComponent , canActivate: [AuthGuard]},
  { path: 'viewTransponder', component: ViewTransponderComponent , canActivate: [AuthGuard], resolve : {viewTransponders:ViewTransponderResolve}},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'user', component: BoardUserComponent , canActivate: [AuthGuard]},
  { path: 'rfid', component: RFIDComponent , canActivate: [AuthGuard]},
  { path: 'transponder', component: TransponderComponent, canActivate: [AuthGuard]},
  { path: 'antenna', component: AntennaComponent, canActivate: [AuthGuard]},
  { path: 'newTransaction', component: TransactionComponent, canActivate: [AuthGuard]},
  { path: 'customerInfo', component: CustomerInformationComponent, canActivate: [AuthGuard]},
  { path: 'vehicleCompanyInfos', component: VehicleInformationComponent, canActivate: [AuthGuard] , resolve : {vehicleCompanyInfos:VehicleInformationResolve}},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
