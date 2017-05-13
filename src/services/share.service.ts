import {Patient} from "../domain/patient"
export class ShareService {
  private selectedPatient: Patient;
  private token: string;
  private selectedAppointment: any;

  public setSelectedPatient(patient: Patient) {
    this.selectedPatient = patient;
  }

  public getSelectedPatient() {
    return this.selectedPatient;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }

  public setSelectedAppointment(appointment: any) {
    this.selectedAppointment = appointment;
  }
  public getSelectedAppointment() {
    return this.selectedAppointment;
  }
}
