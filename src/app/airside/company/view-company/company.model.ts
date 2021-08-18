export class CompanyModel {
  constructor(
    public companyRowId: string,
    public companyId: string,
    public companyName: string,
    public address: string,
    public contactPersonName: string,
    public contactPersonNumber: string,
    public department : string,
    public rowRecordStatus : string,
    public timestamp: Date
  ) {}
}
