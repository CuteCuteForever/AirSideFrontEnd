export class VehicleCompanyModel {
  constructor(
    public vehicleRowId: string,
    public companyId: string,
    public vehicleId: string,
    public companyName: string,
    public companyAddress: string,
    public contactPersonName : string,
    public contactPersonNumber : string,
    public department: string,
    public vehicleRegistrationNumber: string
  ) {}
}
