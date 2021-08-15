import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { CompanyModel } from "./company.model"

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = [ 'companyName', 'address', 'contactPersonName', 'contactPersonNumber', 'department'];
  dataSource: MatTableDataSource<CompanyModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public companyArray: CompanyModel[] = [];

  panelOpenState : boolean ;
  size: number = 0;

  companyNameFilter = new FormControl('')

  filterValues : any = {
    companyName: ''
  }

  constructor(private route: ActivatedRoute) {
    this.companyArray = this.route.snapshot.data.viewCompany;
    this.dataSource = new MatTableDataSource(this.companyArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.size = this.dataSource.data.length
    this.fieldListener();
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

  ngAfterViewInit() {
  }


  private createFilter(): ( companyModel: CompanyModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (companyModel, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(filter)
      return companyModel.companyName.toLowerCase().indexOf(searchTerms.companyName.toLowerCase()) !== -1
    }
    return filterFunction;
  }


}

