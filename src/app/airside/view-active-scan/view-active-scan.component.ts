import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {EPCActiveModel} from "./epc-active.model";
import {ViewPassiveScanService} from "../view-passive-scan/view-passive-scan.service";

@Component({
  selector: 'app-view-active-scan',
  templateUrl: './view-active-scan.component.html',
  styleUrls: ['./view-active-scan.component.css']
})
export class ViewActiveScanComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = [ 'callSign', 'epc', 'antennaNumber'];
  dataSource: MatTableDataSource<EPCActiveModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public epcActiveModelArray: EPCActiveModel[] = [];

  panelOpenState : boolean ;
  size: number = 0;

  antennaNumberFilter = new FormControl('')
  callSignFilter = new FormControl('')

  antennaNumberSources =  [
    {display: '1', value: '1'},
    {display: '2', value: '2'},
    {display: '3', value: '3'},
    {display: '4', value: '4'},
  ];

  filterValues : any = {
    callSign: '',
    antennaNumber : ''
  }

  constructor(private route: ActivatedRoute) {
    this.epcActiveModelArray = this.route.snapshot.data.viewActiveScan;
    this.dataSource = new MatTableDataSource(this.epcActiveModelArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.size = this.dataSource.data.length
    this.fieldListener();
  }

  private fieldListener() {

    this.callSignFilter.valueChanges.subscribe(
      s => {
        this.filterValues.callSign = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )

    this.antennaNumberFilter.valueChanges.subscribe(
      s => {
        this.filterValues.antennaNumber = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )

  }

  clearFilter() {
    this.callSignFilter.setValue('');
    this.antennaNumberFilter.setValue('');
  }

  ngAfterViewInit() {
  }


  private createFilter(): ( epcActiveModel: EPCActiveModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (epcActiveModel, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return epcActiveModel.callSign.toLowerCase().indexOf(searchTerms.callSign.toLowerCase()) !== -1
        && (searchTerms.antennaNumber === ""? true : epcActiveModel.antennaNumber == searchTerms.antennaNumber)
    }
    return filterFunction;
  }


}

