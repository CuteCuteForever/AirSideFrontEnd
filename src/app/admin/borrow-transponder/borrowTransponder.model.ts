export class BorrowTransponder {
  constructor(
    public epc: string,
    public companyID: string,
    public transponderID : string,
    public vehicleID : string,
    public rowRecordStatus: string,
    public timestamp : Date
  ) {}
}
