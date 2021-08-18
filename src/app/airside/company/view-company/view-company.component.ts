import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { CompanyModel } from "./company.model"
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddCompanyComponent} from "../add-company/add-company.component";
import {UpdateCompanyComponent} from "../update-company/update-company.component";
import {UpdateCompanyService} from "../update-company/update-company.service";
import {CommandMapOptions} from "@angular/cli/models/command-runner";
import {ConfirmDialogCompanyDeleteComponent} from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {SuccessErrorDialogComponent} from "../success-error-dialog/success-error-dialog.component";
import {Company} from "../add-company/company.model";
import {AddCompanyService} from "../add-company/add-company.service";
import {DeleteCompanyService} from "../delete-company/delete-company.service";

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = ['edit' , 'delete', 'companyName', 'address', 'contactPersonName', 'contactPersonNumber', 'department'];
  dataSource: MatTableDataSource<CompanyModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  companyArray: CompanyModel[] = [];
  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;
  panelOpenState : boolean ;
  size: number = 0;

  companyNameFilter = new FormControl('')

  filterValues : any = {
    companyName: ''
  }

  constructor (private deleteCompanyService : DeleteCompanyService ,private addCompanyService : AddCompanyService , private updateCompanyService : UpdateCompanyService  , private route: ActivatedRoute , private dialog: MatDialog) {
    this.companyArray = this.route.snapshot.data.viewCompany;
    this.dataSource = new MatTableDataSource(this.companyArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.size = this.dataSource.data.length
    this.fieldListener();
  }

  private fieldListener() {
    this.companyNameFilter.valueChanges.subscribe(
      s => {
        this.filterValues.companyName = s;
        this.dataSource.filter = JSON.stringify(this.filterValues);
        this.size = this.dataSource.filteredData.length
      }
    )

  }

  clearFilter() {
    this.companyNameFilter.setValue('');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  private createFilter(): ( companyModel: CompanyModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (companyModel, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(filter)
      return companyModel.companyName.toLowerCase().indexOf(searchTerms.companyName.toLowerCase()) !== -1
    }
    return filterFunction;
  }

  addNewCompany(){

    const addDialogConfig = new MatDialogConfig();

    addDialogConfig.data = {
      title: 'Create New Company'
    };

    addDialogConfig.maxWidth = 500;
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.hasBackdrop = true;

    const dialogRef =  this.dialog.open(AddCompanyComponent, addDialogConfig);


    dialogRef.afterClosed().subscribe((formValue : CompanyModel) => {

      const newCompany : Company = new Company(
        null,
        null,
        formValue.companyName,
        formValue.address ,
        formValue.contactPersonName ,
        formValue.contactPersonNumber ,
        formValue.department ,
        "valid" ,
        new Date()
      );

      console.log(newCompany)
      this.addCompanyService.insertCompany(newCompany).subscribe(
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

  deleteCompanyDialog(company : CompanyModel){

    const deleteDialog = this.dialog.open(ConfirmDialogCompanyDeleteComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to remove company '+company.companyName+" ?"
      }
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCompanyService.deleteCompany(company).subscribe(
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

  async editCompanyDialog(company : CompanyModel) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: 'Edit Company',
      companyData : company
    };

    dialogConfig.minWidth = 500;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef =  this.dialog.open(UpdateCompanyComponent, dialogConfig);

    let  newCompany : CompanyModel  ;
    await dialogRef.afterClosed().subscribe((data : CompanyModel) => {

        if (data){

          newCompany = new CompanyModel(
            data.companyRowId,
            data.companyId,
            data.companyName,
            data.address,
            data.contactPersonName,
            data.contactPersonNumber,
            data.department,
            "valid" ,
            new Date()
          );

          this.updateCompanyService.updateCompany(newCompany).subscribe(
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

