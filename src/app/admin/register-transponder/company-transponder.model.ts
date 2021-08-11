
export class CompanyTransponder {
  constructor(
              public companyID : string,
              public companyName: string,
              public address: string,
              public contactPersonName: string,
              public contactPersonNumber: string,
              public department: string,
              public rowRecordStatus: string,
              public timestamp : Date
  ) {}
}
