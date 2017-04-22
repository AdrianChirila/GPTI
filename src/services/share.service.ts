import {Patient} from "../domain/patient"
export class ShareService {
  private selectedPatient: Patient;

  public setSelectedPatient(patient: Patient) {
    this.selectedPatient = patient;
  }

  public getSelectedPatient() {
    return this.selectedPatient;
  }
}
