export class Vehicle {
  constructor(
    public vehicleId: string,
    public companyId: string,
              public registrationNumber: string,
              public rowRecordStatus: string,
              public timestamp : Date
  ) {}
}
