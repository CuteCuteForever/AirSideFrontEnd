export class Company {
  constructor(
              public companyRowId: string | null,
              public companyId: string | null,
              public companyName: string,
              public address: string,
              public contactPersonName: string,
              public contactPersonNumber: string,
              public department: string,
              public rowRecordStatus: string,
              public timestamp : Date
  ) {}
}
