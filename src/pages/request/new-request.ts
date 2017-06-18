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
    this.showLoading();
    this.fetchAppointments();
    this.appointments = appointmentService.getAppointments();
    if (this.appointments.length == 0)
      this.newRequestStatus = "Nu exista cereri de programare";
    else
      this.newRequestStatus = `Aveti ${this.newRequestStatus.length} cereri de programare`
  }
  private fetchAppointments() {
    this.appointmentService.fetchAppointments('pending', this.shareService.getToken()).subscribe((event: any) => {
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
    this.navCtrl.push(HomePage);
  }
}
