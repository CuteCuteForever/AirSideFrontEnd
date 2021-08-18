//insert model
export class ViewTransponderModel {
  constructor(
    public transponderRowId: string | null,
    public transponderId: string | null,
    public callSign: string,
    public serialNumber: string,
    public serviceAvailability: string,
    public description: string,
    public warrantyFromDate : Date,
    public warrantyToDate : Date,
    public epc: string,
    public rowRecordStatus: string,
    public timestamp : string
  ) {}
}
