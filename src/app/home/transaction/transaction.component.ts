import { Component, OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

//Company PDF model

class Company {
  companyName = "";
  departmentInformation = ""
}


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor() {}
  company = new Company();

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
  

  ngOnInit(): void {
  }

}
