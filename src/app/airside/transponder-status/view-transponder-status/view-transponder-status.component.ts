import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Transponder} from "../../airside/transponder/view-transponder/transponder.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TransponderStatusModel} from "./transponder-status.model";

@Component({
  selector: 'app-view-transponder-status',
  templateUrl: './view-transponder-status.component.html',
  styleUrls: ['./view-transponder-status.component.css']
})
export class ViewTransponderStatusComponent  implements OnInit,AfterViewInit {

  displayedColumns: string[] = [
    'callSign',
    'serialNumber',
    'outTimestamp',
    'inTimestamp',
    'duration',
    'rentalDuration',
    'transponderStatus',
    'dueNotice',
    'rowRecordStatus' ,
    'timestamp'];

  dataSource: MatTableDataSource<TransponderStatusModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public transponderStatusArray: TransponderStatusModel[] = [];

  panelOpenState : boolean ;
  size: number = 0;

  callSignFilter = new FormControl('')
  rowRecordStatusFilter = new FormControl('')
  transponderStatusFilter = new FormControl('')
  dueNoticeFilter = new FormControl('')
  rentalDurationFilter = new FormControl('')

  rowRecordStatusSources =  [
    {display: 'valid', value: 'valid'},
    {display: 'invalid', value: 'invalid'},
  ];

  rentalDurationSources =  [
    {display: 'Daily', value: 'Daily'},
    {display: 'Weekly', value: 'Weekly'},
    {display: 'Monthly', value: 'Monthly'},
    {display: 'Yearly', value: 'Yearly'},
  ];

  transponderStatusSources =  [
    {display: 'Available', value: 'Available'},
    {display: 'Rent Out', value: 'Rent Out'},
    {display: 'Repair', value: 'Repair'},
  ];

  dueNoticeSources =  [
    {display: 'Due Soon', value: 'Due Soon'}
  ];

  filterValues : any = {
    callSign: '',
    rowRecordStatus: '',
    rentalDuration: '',
    transponderStatus:''
  }

  constructor(private route: ActivatedRoute) {
    this.transponderStatusArray = this.route.snapshot.data.viewTransponderStatus;
    this.dataSource = new MatTableDataSource(this.transponderStatusArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.size = this.dataSource.data.length

    this.fieldListener()
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

    this.transponderStatusFilter.valueChanges.subscribe(
      s => {
        this.filterValues.transponderStatus = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )

    this.dueNoticeFilter.valueChanges.subscribe(
      s => {
        this.filterValues.dueSoon = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )

    this.rentalDurationFilter.valueChanges.subscribe(
      s => {
        this.filterValues.rentalDuration = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )
  }

  clearFilter() {
    this.callSignFilter.setValue('');
    this.rowRecordStatusFilter.setValue('');
    this.transponderStatusFilter.setValue('');
    this.rentalDurationFilter.setValue('');
    this.dueNoticeFilter.setValue('');
  }

  ngAfterViewInit() {
  }


  private createFilter(): (transponderStatusModel: TransponderStatusModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (transponderStatusModel, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(filter)
      return transponderStatusModel.callSign.toLowerCase().indexOf(searchTerms.callSign.toLowerCase()) !== -1
        && transponderStatusModel.rowRecordStatus.toLowerCase().indexOf(searchTerms.rowRecordStatus.toLowerCase()) === 0
        && transponderStatusModel.transponderStatus.toLowerCase().indexOf(searchTerms.transponderStatus.toLowerCase()) === 0
        && searchTerms.dueSoon === "" ? true : (transponderStatusModel.dueSoon ? transponderStatusModel.dueSoon.toLowerCase().indexOf(searchTerms.dueSoon.toLowerCase()) === 0 : false)
        && searchTerms.rentalDuration === "" ? true : (transponderStatusModel.rentalDuration ? transponderStatusModel.rentalDuration.toLowerCase().indexOf(searchTerms.rentalDuration.toLowerCase()) === 0 : false);
    }
    return filterFunction;
  }


}
