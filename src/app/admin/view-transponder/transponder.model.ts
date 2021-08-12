//insert model
export class Transponder {
  constructor(
    public callSign: string,
    public serialNumber: string,
    public serviceAvailability: string,
    public description: string,
    public warrantyFromDate : string,
    public warrantyToDate : string,
    public epc: string,
    public rowRecordStatus: string,
    public timestamp : Date
  ) {}
}
