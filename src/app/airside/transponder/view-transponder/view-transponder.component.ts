import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource  } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {TransponderModel} from "./transponder.model";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {UpdateTransponderService} from "../update-transponder/update-transponder.service";
import {DeleteTransponderService} from "../delete-transponder/delete-transponder.service";
import {AddTransponderService} from "../add-transponder/add-transponder.service";
import {CompanyModel} from "../../company/view-company/company.model";
import {ConfirmDialogCompanyDeleteComponent} from "../../company/confirm-dialog-delete/confirm-dialog-delete.component";
import {SuccessErrorDialogComponent} from "../../company/success-error-dialog/success-error-dialog.component";
import {ConfirmDialogTransponderDeleteComponent} from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateCompanyComponent} from "../../company/update-company/update-company.component";
import {UpdateTransponderComponent} from "../update-transponder/update-transponder.component";
import {AddCompanyComponent} from "../../company/add-company/add-company.component";
import {Company} from "../../company/add-company/company.model";
import {AddTransponderComponent} from "../add-transponder/add-transponder.component";
import {ViewTransponderModel} from "./view-transponder.model";

@Component({
  selector: 'app-view-transponder',
  templateUrl: './view-transponder.component.html',
  styleUrls: ['./view-transponder.component.css']
})
export class ViewTransponderComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = [ 'edit' , 'delete', 'call_sign', 'description', 'serial_number', 'serviceAvailability', 'warrantyFromDate' , 'warrantyToDate' , 'row_record_status', 'timestamp'];
  dataSource: MatTableDataSource<ViewTransponderModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public transponderArray: ViewTransponderModel[] = [];

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

  constructor(private addTransponderService : AddTransponderService , private deleteTransponderService : DeleteTransponderService ,private updateTransponderService : UpdateTransponderService, private route: ActivatedRoute,private dialog: MatDialog) {
    this.transponderArray = this.route.snapshot.data.viewTransponders;


    for (let i = 0; i < this.transponderArray.length; i++) {
      this.transponderArray[i].timestamp = this.transponderArray[i].timestamp.toLocaleString()
    }

    this.dataSource = new MatTableDataSource(this.transponderArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
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

  deleteTransponderDialog(transponderModel : TransponderModel){

    const deleteDialog = this.dialog.open(ConfirmDialogTransponderDeleteComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to remove transponder '+transponderModel.callSign+" ?"
      }
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTransponderService.deleteTransponder(transponderModel).subscribe(
          (data : any) => {
            const successErrorDialog = this.dialog.open(SuccessErrorDialogComponent, {
              data: {
                title: 'Success',
                message: data.message
              }
            });

            successErrorDialog.afterClosed().subscribe(data => {
              if (data ===  true) {
                window.location.reload()
              }
            });
          },
          (error : any) => {
            if (error.error.message) {
              this.dialog.open(SuccessErrorDialogComponent, {
                data: {
                  title: 'Error',
                  message: error.error.message
                }
              });
            }
          }
        );
      }
    });
  }


  async editTransponderDialog(transponderModel : TransponderModel){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: 'Edit Transponder',
      transponder : transponderModel
    };

    dialogConfig.minWidth=600;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef =  this.dialog.open(UpdateTransponderComponent, dialogConfig);

    let  newTransponderModel : TransponderModel  ;
    await dialogRef.afterClosed().subscribe((data : TransponderModel) => {

        if (data){

          const newTransponderModel: TransponderModel = new TransponderModel(
            data.transponderRowId,
            data.transponderId,
            data.callSign,
            data.serialNumber,
            data.serviceAvailability,
            data.description,
            data.warrantyFromDate,
            data.warrantyToDate,
            data.epc,
            "valid",
            new Date());

          this.updateTransponderService.updateTransponder(newTransponderModel).subscribe(
            (data : any) => {
              const successErrorDialog = this.dialog.open(SuccessErrorDialogComponent, {
                data: {
                  title: 'Success',
                  message: data.message
                }
              });

              successErrorDialog.afterClosed().subscribe(data => {
                if (data ===  true) {
                  window.location.reload()
                }
              });
            },
            (error : any) => {
              if (error.error.message) {
                this.dialog.open(SuccessErrorDialogComponent, {
                  data: {
                    title: 'Error',
                    message: error.error.message
                  }
                });
              }
            }
          );
        }
      }
    );
  }

  addNewTransponder(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: 'Create New Transponder'
    };

    dialogConfig.minWidth=550;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef =  this.dialog.open(AddTransponderComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((formValue : TransponderModel) => {

      console.log(formValue);
      const transponder: TransponderModel = new TransponderModel(
        null,
        null,
        formValue.callSign,
        formValue.serialNumber,
        formValue.serviceAvailability,
        formValue.description,
        formValue.warrantyFromDate,
        formValue.warrantyToDate,
        //"E20030340404010",
        formValue.epc,
        "valid",
        new Date());

      this.addTransponderService.insertTransponder(transponder).subscribe(
        (data : any) => {
          const successErrorDialog = this.dialog.open(SuccessErrorDialogComponent, {
            data: {
              title: 'Success',
              message: data.message
            }
          });

          successErrorDialog.afterClosed().subscribe(data => {
            if (data ===  true) {
              window.location.reload()
            }
          });
        },
        (error : any) => {
          if (error.error.message) {
            this.dialog.open(SuccessErrorDialogComponent, {
              data: {
                title: 'Error',
                message: error.error.message
              }
            });
          }
        }
      );
    });

  }


  clearFilter() {
    this.callSignFilter.setValue('');
    this.rowRecordStatusFilter.setValue('');
  }


  private createFilter(): (transponder: ViewTransponderModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (transponder, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return transponder.callSign.toLowerCase().indexOf(searchTerms.callSign.toLowerCase()) !== -1
        && transponder.rowRecordStatus.toLowerCase().indexOf(searchTerms.rowRecordStatus.toLowerCase()) === 0;
    }
    return filterFunction;
  }


}

