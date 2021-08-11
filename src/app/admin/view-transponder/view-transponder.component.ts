import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource  } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {Transponder} from "./transponder.model";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-view-transponder',
  templateUrl: './view-transponder.component.html',
  styleUrls: ['./view-transponder.component.css']
})
export class ViewTransponderComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['transponderID', 'epc', 'call_sign', 'description', 'serial_number', 'transponder_status', 'row_record_status', 'timestamp'];
  dataSource: MatTableDataSource<Transponder>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public transponderArray: Transponder[] = [];

  size: number = 0;
  callSignFilter = new FormControl('');
  idFilter = new FormControl('');
  epcFilter = new FormControl('');
  descriptionFilter = new FormControl('');
  serialNumberFilter = new FormControl('');
  transponderStatusFilter = new FormControl('');
  rowRecordStatusFilter = new FormControl('');
  timeStampFilter = new FormControl('');
  filterValues = {
    id: '',
    epc: '',
    callSign: '',
    description: '',
    serialNumber: '',
    transponderStatus: '',
    rowRecordStatus: '',
    timeStamp: ''
  };

  constructor(private route: ActivatedRoute) {

    this.transponderArray = this.route.snapshot.data.viewTransponders;
    this.dataSource = new MatTableDataSource(this.transponderArray);

    this.dataSource.filterPredicate = this.createFilter();


  }

  ngOnInit(): void {
    /*    this.transponderArray = this.route.snapshot.data.viewTransponders;
        this.dataSource = new MatTableDataSource(this.transponderArray);
        this.dataSource.filterPredicate = this.createFilter();*/
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )

    this.epcFilter.valueChanges
      .subscribe(
        epc => {
          this.filterValues.epc = epc;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )

    this.callSignFilter.valueChanges
      .subscribe(
        callSign => {
          this.filterValues.callSign = callSign;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )

    this.descriptionFilter.valueChanges
      .subscribe(
        desc => {
          this.filterValues.description = desc;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )

    this.serialNumberFilter.valueChanges
      .subscribe(
        serialNumber => {
          this.filterValues.serialNumber = serialNumber;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )

    this.transponderStatusFilter.valueChanges
      .subscribe(
        transponderStatus => {
          this.filterValues.transponderStatus = transponderStatus;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )

    this.rowRecordStatusFilter.valueChanges
      .subscribe(
        rrs => {
          this.filterValues.rowRecordStatus = rrs;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )

    this.timeStampFilter.valueChanges
      .subscribe(
        ts => {
          this.filterValues.timeStamp = ts;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.size = this.dataSource.filteredData.length;
        }
      )
  }


  ngAfterViewInit() {
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.callSign.toLowerCase().indexOf(searchTerms.callSign.toLowerCase() , 0) === 0
        && data.serialNumber.toLowerCase().indexOf(searchTerms.serialNumber.toLowerCase() , 0) === 0
        && data.transponderStatus.toLowerCase().indexOf(searchTerms.transponderStatus.toLowerCase() , 0) === 0
        && data.rowRecordStatus.toLowerCase().indexOf(searchTerms.rowRecordStatus.toLowerCase() , 0) === 0
        && data.description.toLowerCase().indexOf(searchTerms.description.toLowerCase() , 0) === 0
    }
    return filterFunction;
  }


}
