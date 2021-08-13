import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource  } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {VehicleCompanyModel} from "./vehicle-company.model";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Transponder} from "../../transponder/view-transponder/transponder.model";

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['companyName', 'companyAddress', 'contactPersonName', 'contactPersonNumber', 'department' , 'vehicleRegistrationNumber'];
  dataSource: MatTableDataSource<VehicleCompanyModel>

  panelOpenState : boolean ;
  size: number = 0;

  companyNameFilter = new FormControl('')

  filterValues : any = {
    companyName: ''
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public vehicleCompanyArray : VehicleCompanyModel[] = [];

  constructor(private route: ActivatedRoute ) {
    this.vehicleCompanyArray = this.route.snapshot.data.viewVehicleCompany;
    this.dataSource = new MatTableDataSource(this.vehicleCompanyArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.size = this.dataSource.data.length
    this.fieldListener();
  }

  ngAfterViewInit() {
  }

  private fieldListener() {
    this.companyNameFilter.valueChanges.subscribe(
      s => {
        this.filterValues.companyName = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )
  }

  clearFilter() {
    this.companyNameFilter.setValue('');
  }

  private createFilter(): (vehicleCompanyModel: VehicleCompanyModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (vehicleCompanyModel, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return vehicleCompanyModel.companyName.toLowerCase().indexOf(searchTerms.companyName.toLowerCase()) !== -1;
    }
    return filterFunction;
  }

}
