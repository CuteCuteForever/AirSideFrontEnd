export class ReturnTransponder {
  constructor(
    public epc: string,
    public rowRecordStatus: string,
    public timestamp : Date
  ) {}
}
