
export class Transponder {
  constructor(
    public transponderID : string,
    public epc: string,
    public callSign: string,
    public description: string,
    public rowRecordStatus: string,
    public serialNumber: string,
    public timestamp : Date,
    public transponderStatus: string,
  ) {}
}
