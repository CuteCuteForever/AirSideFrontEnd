import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransponderStatusModel} from "../view-transponder-status/transponder-status.model";
@Component({
  selector: 'app-view-details-dialog',
  templateUrl: './view-details-dialog.component.html',
  styleUrls: ['./view-details-dialog.component.css']
})
export class ViewDetailsDialogComponent implements OnInit {

  transponderStatusModel : TransponderStatusModel ;

  constructor(public dialogRef: MatDialogRef<ViewDetailsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    this.transponderStatusModel = data.transponderStatusModel;
  }

  ngOnInit(): void {
  }

}
