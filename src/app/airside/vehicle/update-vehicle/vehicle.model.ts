//inserted Model
export class VehicleModel {
  constructor(
    public vehicleRowId: string | null,
    public vehicleId: string | null,
    public companyId: string | null,
              public registrationNumber: string,
              public rowRecordStatus: string,
              public timestamp : Date
  ) {}
}
