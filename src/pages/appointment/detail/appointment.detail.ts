import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading} from "ionic-angular";
import {PatientService} from "../../../providers/patient.service";
import {Patient} from "../../../domain/patient";
import {ShareService} from "../../../services";
import {AppointmentService} from "../../../providers/appointment.service";
import {NewRequestPage} from "../../request/new-request";
@Component({
  selector: 'patient-detail',
  templateUrl: 'patient.detail.html'
})
export class PatientDetailPage {
  private loader: Loading;
  private patient: Patient [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService) {
    console.log('Patient detail page constructor!!!?');
  }
  private ionViewDidLoad() {
    console.log('Ion view did load!');
  }
  private ionViewWillEnter() { // THERE IT IS!!!
    console.log('On view will enter!');
    this.loader = this.loadController.create({
      content: "Patient details"
    });
    this.showLoading();
    this.fetch().then((patient: any) => {
      console.log('Patient was fetch:', patient);
      this.patient = patient;
    });
  }

  public fetch() {
    return new Promise((resolve, reject) => {
      this.fetchPatient(this.shareService.getSelectedPatient(), (err: any, patient: any) => {
        if (err) {
          reject(err);
        } else
          resolve(patient);
      });
    });
  }
  private fetchPatient(selectedPatient: Patient, callback: any) {
    this.patientService.fetchPatientById(this.shareService.getToken(), selectedPatient).subscribe((event: any) => {
        console.log('Done!', event);
        this.patient = [this.patientService.getTargetPatient()];
        callback(null, this.patient);
        this.hideLoading();
      },
      (error: any) => {
        console.log('Error::', error);
        callback(error);
      })
  }
  private showLoading() {
    this.loader.present();
  }
  private acceptRequest() {
    this.appointmentService.book(this.shareService.getToken(), this.shareService.getSelectedAppointment()).subscribe((event: any)=> {
      console.log('Appointment was made!');
      this.navCtrl.setRoot(NewRequestPage);
    });
  }
  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }

}
