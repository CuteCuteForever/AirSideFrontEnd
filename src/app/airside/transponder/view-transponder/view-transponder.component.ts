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
export class ViewTransponderComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = [ 'call_sign', 'description', 'serial_number', 'serviceAvailability', 'warrantyFromDate' , 'warrantyToDate' , 'row_record_status', 'timestamp'];
  dataSource: MatTableDataSource<Transponder>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public transponderArray: Transponder[] = [];

  panelOpenState : boolean ;
  size: number = 0;

  callSignFilter = new FormControl('')
  rowRecordStatusFilter = new FormControl('')

  rowRecordStatusSources =  [
    {display: 'valid', value: 'valid'},
    {display: 'invalid', value: 'invalid'},
  ];

  filterValues : any = {
    callSign: '',
    rowRecordStatus: ''
  }

  constructor(private route: ActivatedRoute) {
    this.transponderArray = this.route.snapshot.data.viewTransponders;

    for (let i = 0; i < this.transponderArray.length; i++) {
      this.transponderArray[i].timestamp = new Date(this.transponderArray[i].timestamp).toLocaleString()
    }

    this.dataSource = new MatTableDataSource(this.transponderArray);
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

    this.rowRecordStatusFilter.valueChanges.subscribe(
      s => {
        this.filterValues.rowRecordStatus = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )
  }

  clearFilter() {
    this.callSignFilter.setValue('');
    this.rowRecordStatusFilter.setValue('');
  }

  ngAfterViewInit() {
  }


  private createFilter(): (transponder: Transponder, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (transponder, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return transponder.callSign.toLowerCase().indexOf(searchTerms.callSign.toLowerCase()) !== -1
        && transponder.rowRecordStatus.toLowerCase().indexOf(searchTerms.rowRecordStatus.toLowerCase()) === 0;
    }
    return filterFunction;
  }


}

