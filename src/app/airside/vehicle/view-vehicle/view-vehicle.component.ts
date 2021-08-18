import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource  } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {VehicleCompanyModel} from "./vehicle-company.model";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {TransponderModel} from "../../transponder/view-transponder/transponder.model";
import {CompanyModel} from "../../company/view-company/company.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateCompanyComponent} from "../../company/update-company/update-company.component";
import {SuccessErrorDialogComponent} from "../../company/success-error-dialog/success-error-dialog.component";
import {ConfirmDialogCompanyDeleteComponent} from "../../company/confirm-dialog-delete/confirm-dialog-delete.component";
import {DeleteVehicleService} from "../delete-vehicle/delete-vehicle.service";
import {UpdateVehicleService} from "../update-vehicle/update-vehicle.service";
import {UpdateVehicleComponent} from "../update-vehicle/update-vehicle.component";
import {VehicleModel} from "../update-vehicle/vehicle.model";
import {ConfirmDialogVehicleDeleteComponent} from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {AddCompanyComponent} from "../../company/add-company/add-company.component";
import {Company} from "../../company/add-company/company.model";
import {AddVehicleComponent} from "../add-vehicle/add-vehicle.component";
import {Vehicle} from "../add-vehicle/vehicle.model";
import {AddVehicleService} from "../add-vehicle/add-vehicle.service";

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['edit', 'delete' , 'companyName', 'companyAddress', 'contactPersonName', 'contactPersonNumber', 'department' , 'vehicleRegistrationNumber'];
  dataSource: MatTableDataSource<VehicleCompanyModel>

  panelOpenState : boolean ;
  size: number = 0;

  companyNameFilter = new FormControl('')

  filterValues : any = {
    companyName: ''
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public vehicleCompanyArray : VehicleCompanyModel[] = [];

  constructor(private addVehicleService : AddVehicleService , private route: ActivatedRoute , private dialog: MatDialog , private updateVehicleService : UpdateVehicleService , private deleteVehicleService : DeleteVehicleService ) {
    this.vehicleCompanyArray = this.route.snapshot.data.viewVehicleCompany;
    this.dataSource = new MatTableDataSource(this.vehicleCompanyArray);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.size = this.dataSource.data.length
    this.fieldListener();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  deleteVehicleDialog(vehicleCompanyModel : VehicleCompanyModel){

    const deleteDialog = this.dialog.open(ConfirmDialogVehicleDeleteComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to remove vehicle '+vehicleCompanyModel.vehicleRegistrationNumber+" ?"
      }
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {

        const vehicleModel : VehicleModel = new VehicleModel(
          null,
          vehicleCompanyModel.vehicleId,
          vehicleCompanyModel.companyId,
          vehicleCompanyModel.vehicleRegistrationNumber,
          "valid",
          new Date()
        )

        this.deleteVehicleService.deleteVehicle(vehicleModel).subscribe(
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


  addNewVehicle(){

    const addDialogConfig = new MatDialogConfig();

    addDialogConfig.data = {
      title: 'Create New Vehicle'
    };

    addDialogConfig.maxWidth = 500;
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.hasBackdrop = true;

    const dialogRef =  this.dialog.open(AddVehicleComponent, addDialogConfig);

    dialogRef.afterClosed().subscribe((vehicle : Vehicle) => {

      this.addVehicleService.insertVehicle(vehicle).subscribe(
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

  async editVehicleDialog(vehicleCompanyModel : VehicleCompanyModel) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: 'Edit Vehicle',
      vehicleCompanyData : vehicleCompanyModel
    };
    dialogConfig.minWidth = 400;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef =  this.dialog.open(UpdateVehicleComponent, dialogConfig);

    await dialogRef.afterClosed().subscribe((data : VehicleModel) => {

        if (data){
          this.updateVehicleService.updateVehicle(data).subscribe(
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

  clearFilter() {
    this.companyNameFilter.setValue('');
  }

  private createFilter(): (vehicleCompanyModel: VehicleCompanyModel, filter: string) => boolean {
    // @ts-ignore
    let filterFunction = function (vehicleCompanyModel, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return vehicleCompanyModel.companyName.toLowerCase().indexOf(searchTerms.companyName.toLowerCase()) !== -1;
    }
    return filterFunction;
  }

}
