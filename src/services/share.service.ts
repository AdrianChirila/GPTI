import {Patient} from "../domain/patient"
export class ShareService {
  private beforeAppointmentDetail: string;
  private selectedPatient: Patient;
  private token: string;
  private selectedAppointment: any;
  private appMode: string;
  private generalPractitioner: string;

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

  public getGeneralPractitioner() {
    return this.generalPractitioner
  }

  public setAppMode(appMode: string) {
    this.appMode = `${appMode}Mode`;
  }

  public getAppMode() {
    return this.appMode;
  }

  public setGeneralPractitioner(generalPractitioner: string) {
    this.generalPractitioner = generalPractitioner;
  }

  public setBeforeAppointmentDetail(s: string) {
    this.beforeAppointmentDetail = s;
  }

  getBeforeAppointmentDetail() {
    return this.beforeAppointmentDetail;
  }
}
