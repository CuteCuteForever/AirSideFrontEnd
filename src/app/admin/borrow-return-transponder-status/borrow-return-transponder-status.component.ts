import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Transponder} from "../view-transponder/transponder.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {BorrowReturnModel} from "./borrowReturn.model";

@Component({
  selector: 'app-borrow-return-transponder-status',
  templateUrl: './borrow-return-transponder-status.component.html',
  styleUrls: ['./borrow-return-transponder-status.component.css']
})
export class BorrowReturnTransponderStatusComponent implements OnInit {

  displayedColumns: string[] = ['id' , 'call_sign' , 'borrowTimeStamp', 'returnTimeStamp',  'difference',  'serial_number' , 'transponder_status' , 'row_record_status' ];

  dataSource: MatTableDataSource<BorrowReturnModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute ) {
  }

  public borrowReturnArray : BorrowReturnModel[] = [];

  ngOnInit(): void {

    this.borrowReturnArray = this.route.snapshot.data.borrowReturnResolve;
    console.log(this.borrowReturnArray)
    this.dataSource = new MatTableDataSource(this.borrowReturnArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
  }

}
