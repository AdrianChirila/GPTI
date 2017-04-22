export class Patient {
  name: any;

  constructor(patientJson: any) {
    this.name = patientJson.name
  }

  public getName() {
    return this.name;
  }
}
