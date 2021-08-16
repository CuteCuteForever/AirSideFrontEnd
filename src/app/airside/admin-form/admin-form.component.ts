import { Component, OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from'pdfmake/build/vfs_fonts';
import {CompanyModel} from "../vehicle/update-vehicle/company.model";
import {UpdateVehicleService} from "../vehicle/update-vehicle/update-vehicle.service";
import {AdminFormService} from "./admin-form.service";
import {VehicleCompanyModel} from "./vehicle-company.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

//Company PDF model

class Company {
  companyName = "";
  departmentInformation = ""
}

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  companySelectArray : CompanyModel[];
  vehicleCompanyModel : VehicleCompanyModel = new VehicleCompanyModel();

  isError  = false ;
  isSuccessful = false;
  successMessage = "";
  errorMessage : string ;
  company = new Company();
  companySelected : CompanyModel;

  constructor(private adminFormService : AdminFormService) {}

  ngOnInit(): void {

    this.clearSuccessMessage()
    this.clearErrorMessage()

    this.adminFormService.getUniqueCompany().subscribe( data => {
      this.companySelectArray = data;
    }, error => {
      if (error.message){
        this.setErrorMessage(error.message)
      }
    });
  }

  generatePDF() {
    let docDefinition = {
      header: 'Inovice Airside',
      content: [
        { text: 'Company Name',
          fontSize: 15,
          bold: true
        },
      //   {
      //     columns: [
      //         [
      //             {
      //               text: this.company.companyName,
      //             },
      //             {
      //               text: this.company.departmentInformation
      //             }
      //         ]
      //     ]
      // },
      {
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ 'auto', 'auto'],

          body: [
            [ 'Company Name', 'Department Name'],
            [ {text: this.company.companyName}, { text: this.company.departmentInformation}]
          ]
        }
      }


      ]
    };
    pdfMake.createPdf(docDefinition).open();
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


  onChangeCompanySelect(companySelected: any) {

    this.adminFormService.getVehicleCompany(companySelected.companyId).subscribe( data => {
      this.vehicleCompanyModel = data;
      console.log(this.vehicleCompanyModel)
    }, error => {
      if (error.message){
        console.log(error)
        this.setErrorMessage(error.error.message)
      }
    });
  }
}
