export class EPCPassiveModel {
  constructor(
   // public epcPassiveRowId: string,
    public epc: string,
    public antennaNumber: string,
    public rowRecordStatus : string,
    public timestamp: string
  ) {}
}
