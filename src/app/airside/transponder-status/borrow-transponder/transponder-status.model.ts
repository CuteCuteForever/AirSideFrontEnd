export class TransponderStatusModel {
  constructor(
    public transponderStatusId: null,
    public epc: string,
    public companyId: string,
    public out_timestamp: Date,
    public in_timestamp: Date,
    public rentalDuration: string,
    public transponderId: string,
    public transponderStatus: string,
    public vehicleId: string,
    public rowRecordStatus: string,
    public timestamp: Date
  ) {
  }
}
