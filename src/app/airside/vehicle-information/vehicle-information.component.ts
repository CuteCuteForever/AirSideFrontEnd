import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource  } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {VehicleInformationService} from "./vehicle-Information.service";
import {VehicleCompany} from "./vehicle.model";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-vehicle-information',
  templateUrl: './vehicle-information.component.html',
  styleUrls: ['./vehicle-information.component.css']
})
export class VehicleInformationComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['companyID' , 'company_name', 'company_address', 'contact_person_name', 'contact_person_number', 'department' , 'vehicle_registration_number'];
  dataSource: MatTableDataSource<VehicleCompany>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public vehicleCompanyArray : VehicleCompany[] = [];

  constructor(private route: ActivatedRoute ) {
  }

 ngOnInit(): void {
   this.vehicleCompanyArray = this.route.snapshot.data.vehicleCompanyInfos;
   this.dataSource = new MatTableDataSource(this.vehicleCompanyArray);
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
   console.log(this.vehicleCompanyArray);
 }

  ngAfterViewInit() {
  }

}
