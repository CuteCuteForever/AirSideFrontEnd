

export class VehicleCompany {

  private _companyId: number;
  private _company_name: string;
  private _company_Address: string;
  private _contact_person_name: string;
  private _contact_person_number: string;
  private _department: string;
  private _vehicle_registration_number: string;


  get companyId(): number {
    return this._companyId;
  }

  set companyId(value: number) {
    this._companyId = value;
  }

  get company_name(): string {
    return this._company_name;
  }

  set company_name(value: string) {
    this._company_name = value;
  }

  get company_Address(): string {
    return this._company_Address;
  }

  set company_Address(value: string) {
    this._company_Address = value;
  }

  get contact_person_name(): string {
    return this._contact_person_name;
  }

  set contact_person_name(value: string) {
    this._contact_person_name = value;
  }

  get contact_person_number(): string {
    return this._contact_person_number;
  }

  set contact_person_number(value: string) {
    this._contact_person_number = value;
  }

  get department(): string {
    return this._department;
  }

  set department(value: string) {
    this._department = value;
  }

  get vehicle_registration_number(): string {
    return this._vehicle_registration_number;
  }

  set vehicle_registration_number(value: string) {
    this._vehicle_registration_number = value;
  }

  constructor(companyId: number, company_name: string, company_Address: string, contact_person_name: string, contact_person_number: string, department: string, vehicle_registration_number: string) {
    this._companyId = companyId;
    this._company_name = company_name;
    this._company_Address = company_Address;
    this._contact_person_name = contact_person_name;
    this._contact_person_number = contact_person_number;
    this._department = department;
    this._vehicle_registration_number = vehicle_registration_number;
  }
}
