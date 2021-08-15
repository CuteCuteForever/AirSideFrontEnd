import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog-delete.component.html',
  styleUrls: ['./confirm-dialog-delete.component.css']
})
export class ConfirmDialogCompanyDeleteComponent implements OnInit {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogCompanyDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
  }
}
