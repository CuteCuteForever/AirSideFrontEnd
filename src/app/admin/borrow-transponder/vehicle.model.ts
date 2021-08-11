export class Vehicle {
  constructor(
    public vehicleID: string,
    public companyID: string,
              public registrationNumber: string,
              public rowRecordStatus: string,
              public timestamp : Date
  ) {}
}
