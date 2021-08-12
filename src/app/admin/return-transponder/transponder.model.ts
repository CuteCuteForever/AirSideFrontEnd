
export class Transponder {
  constructor(
    public transponderId: string,
    public callSign: string,
    public serialNumber: string,
    public serviceAvailability: string,
    public description: string,
    public warranty: Date,
    public epc: string,
    public rowRecordStatus: string,
    public timestamp: Date
  ) {
  }
}
