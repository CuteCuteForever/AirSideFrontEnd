//inserted Model
export class Vehicle {
  constructor(
    public vehicleId: string | null,
    public companyId: string,
              public registrationNumber: string,
              public rowRecordStatus: string,
              public timestamp : Date
  ) {}
}
