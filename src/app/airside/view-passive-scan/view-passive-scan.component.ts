import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EPCPassiveModel} from "./epc-passive.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-passive-scan',
  templateUrl: './view-passive-scan.component.html',
  styleUrls: ['./view-passive-scan.component.css']
})
export class ViewPassiveScanComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = [ 'epc', 'antennaNumber', 'rowRecordStatus', 'timestamp'];
  dataSource: MatTableDataSource<EPCPassiveModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public epcPassiveModelArray: EPCPassiveModel[] = [];

  panelOpenState : boolean ;
  size: number = 0;

  antennaNumberFilter = new FormControl('')

  antennaNumberSources =  [
    {display: '1', value: '1'},
    {display: '2', value: '2'},
    {display: '3', value: '3'},
    {display: '4', value: '4'},
  ];

  filterValues : any = {
    antennaNumber : ''
  }

  constructor(private route: ActivatedRoute) {
    this.epcPassiveModelArray = this.route.snapshot.data.viewPassiveScan;
    this.dataSource = new MatTableDataSource(this.epcPassiveModelArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.size = this.dataSource.data.length
    this.fieldListener();
  }

  private fieldListener() {
    this.antennaNumberFilter.valueChanges.subscribe(
      s => {
        this.filterValues.antennaNumber = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )

  }

  clearFilter() {
    this.antennaNumberFilter.setValue('');
  }

  ngAfterViewInit() {
  }


  private createFilter(): ( epcPassiveModel: EPCPassiveModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (epcPassiveModel, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return searchTerms.antennaNumber !== "" ? epcPassiveModel.antennaNumber == searchTerms.antennaNumber : true
    }
    return filterFunction;
  }


}

