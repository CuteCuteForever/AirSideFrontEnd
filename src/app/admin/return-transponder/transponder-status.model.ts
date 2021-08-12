//insert
export class TransponderStatusModel {
  constructor(
    public epc: string,
    public companyId: string,
    public out_timestamp: Date,
    public in_timestamp: Date,
    public transponderId: string,
    public transponderStatus: string,
    public vehicleId: string,
    public rowRecordStatus: string,
    public timestamp: Date
  ) {
  }
}
