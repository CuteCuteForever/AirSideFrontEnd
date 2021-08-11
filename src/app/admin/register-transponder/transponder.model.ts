//insert model
export class Transponder {
  constructor(
    public callSign: string,
    public serialNumber: string,
    public serviceAvailability: string,
    public description: string,
    public warranty : string,
    public epc: string,
    public rowRecordStatus: string,
    public timestamp : Date
  ) {}
}
