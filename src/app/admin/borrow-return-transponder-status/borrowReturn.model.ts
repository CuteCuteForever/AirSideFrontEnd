export class BorrowReturnModel {
  constructor(
    public id: number,
    public borrowTimeStamp: Date,
    public returnTimeStamp: Date,
    public difference: string,
    public epc: string,
    public call_sign: string,
    public serial_number: string,
    public transponder_status: string,
    public row_record_status: string
  ) {}
}
