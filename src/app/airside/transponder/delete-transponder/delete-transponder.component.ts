import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Company} from "../../company/add-company/company.model";
import {NgForm} from "@angular/forms";
import {ConfirmDialogTransponderDeleteComponent} from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {DeleteTransponderService} from "./delete-transponder.service";
import { TransponderModel } from "./transponder.model"

@Component({
  selector: 'app-delete-transponder',
  templateUrl: './delete-transponder.component.html',
  styleUrls: ['./delete-transponder.component.css']
})
export class DeleteTransponderComponent implements OnInit {

  constructor(private deleteTransponderService : DeleteTransponderService , private dialog: MatDialog) { }

  transponderArray:  TransponderModel[];
  callSignNG : any ;
  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;

  transponderNG : TransponderModel

  ngOnInit(): void {

    this.clearSuccessMessage()
    this.clearErrorMessage()

    this.deleteTransponderService.getTransponders().subscribe( data => {
      this.transponderArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });

  }

  onSubmit(form: NgForm) {

    this.clearErrorMessage()
    this.clearSuccessMessage()

    const confirmDialog = this.dialog.open(ConfirmDialogTransponderDeleteComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to remove transponder '+form.value.transponder.callSign+" ?"
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTransponderService.deleteTransponder(this.transponderNG).subscribe(
          (data : any) => {
            this.setSuccessMessage(data.message)
            form.reset();
          },
          (error : any) => {
            if (error.error.message) {
              this.setErrorMessage(error.error.message)
            }
          }
        );
      }
    });
  }

  onChangeCallSignSelect(val : TransponderModel ){
    this.transponderNG = val;
  }

  clearErrorMessage(){
    this.isError = false;
    this.errorMessage = "";
  }

  setErrorMessage(errorMessage : string) {
    this.isError = true;
    this.errorMessage = errorMessage;
  }

  setSuccessMessage(successMessage : string) {
    this.isSuccessful = true;
    this.successMessage = successMessage;
  }

  clearSuccessMessage() {
    this.isSuccessful = true;
    this.successMessage = "";
  }


}
