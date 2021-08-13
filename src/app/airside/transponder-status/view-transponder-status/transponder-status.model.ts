//insert
export class TransponderStatusModel {
  constructor(
    public transponderStatusId: number,
    public companyId: string,
    public outTimestamp: string,
    public inTimestamp: string,
    public rentalDuration : string,
    public transponderId : string,
    public transponderStatus : string,
    public dueSoon : string,
    public vehicleId : string,
    public rowRecordStatus : string,
    public timestamp : string,
    public  registrationNumber : string,
    public companyName : string,
    public address : string,
    public contactPersonName : string,
    public contactPersonNumber : string,
    public department : string,
    public callSign : string,
    public serialNumber : string,
    public serviceAvailability : string,
    public description : string,
    public warrantyFromDate : string,
    public warrantyToDate : string,
    public duration : string,
    public epc : string,
  ) {
  }
}
