import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {ShareService} from "../../services/share.service";
import {PatientDetailPage} from "../patient-details/patient.details";
import {AppointmentService} from "../../providers/appointment.service";
import {HomePage} from "../home/home";
import {AppointmentDetailPage} from "../appointment/detail/appointment.detail";

@Component({
  selector: 'page-request',
  templateUrl: 'new-request.html'
})
export class NewRequestPage {
  private newRequestStatus: string;
  private statusColor: string;
  loader: Loading;
  private appointments: any[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadController: LoadingController,
              public shareService: ShareService,
              public appointmentService: AppointmentService) {
    this.loader = this.loadController.create({
      content: "Patient details"
    });
  }
  private ionViewDidLoad() {
    console.log('Ion view did load!');
  }
  private ionViewWillEnter() {
    console.log('Ion view will enter');
    this.showLoading();
    this.fetchAppointments(() => {
      this.appointments = this.appointmentService.getAppointments();
      console.log('len:::', typeof this.appointments);
      console.log('len:::', this.appointments);
      console.log('len:::', this.appointments.length);
      console.log('len:::', this.appointments[0]);
      if (!this.appointments[0]) {
        this.newRequestStatus = "Nu exista cereri de programare";
        this.statusColor = 'danger';
      }
      else {
        this.newRequestStatus = `Cereri de consultatie`;
        this.statusColor = 'secondary'
      }
    });
  }
  private fetchAppointments(callback: any) {
    this.appointmentService.fetchAppointments('pending', this.shareService.getToken()).subscribe((event: any) => {
        callback();
        console.log('Done!', event);
        this.hideLoading();
      },
      (error: any) => {
        console.log('Error::', error);
      });
  }
  private showLoading() {
    this.loader.present();
  }

  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }
  goToPatientDetails(appointment: any) {
    this.shareService.setSelectedPatient(this.getPatientFromAppointment(appointment));
    this.shareService.setSelectedAppointment(appointment);
    // console.log('Go to patient Details!', patient.name.family);
    // this.showLoading();
    this.shareService.setBeforeAppointmentDetail('newRequest');
    this.navCtrl.push(AppointmentDetailPage);
    // this.hideLoading();
  }

  private getPatientFromAppointment(appointment: any) {
    let targetPatient: any = null;
    appointment.participant.forEach((participant: any) => {
      if (participant.actor.patient) {
        targetPatient = participant.actor.patient;
      }
    });
    return targetPatient;
  }

  private goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}
