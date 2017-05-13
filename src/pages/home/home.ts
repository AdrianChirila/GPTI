import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {PatientDetailPage} from "../patient-details/patient.details";
import {NewRequestPage} from "../request/new-request";
import {PatientService} from "../../providers/patient.service";
import {ShareService} from "../../services/share.service"
import {AppointmentService} from "../../providers/appointment.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  loader: Loading;
  patients: any [];
  appointments: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService) {
    this.loader = this.loadController.create({
      content: "Patient details"
    });
    this.showLoading();
    // this.fetchPatients();
    this.fetchAppointments();
    this.appointments = appointmentService.getAppointments();
  }

  private showLoading() {
    this.loader.present();
  }

  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }

  goToPatientDetails(appointment: any) {
    this.shareService.setSelectedPatient(this.getPatientFromAppointment(appointment));
    // console.log('Go to patient Details!', patient.name.family);
    // this.showLoading();
    this.navCtrl.setRoot(PatientDetailPage);
    // this.hideLoading();
  }

  private fetchPatients() {
    this.patientService.fetchPatients().subscribe((event: any) => {
        // let parsedEvent: any = event.json();
        this.hideLoading();
        console.log('Done!', event);
      },
      (error: any) => {
        console.log('Error::', error);
      });
  }

  private fetchAppointments() {
    this.appointmentService.fetchAppointments('booked', this.shareService.getToken()).subscribe((event: any) => {
        console.log('Done!', event);
        this.hideLoading();
      },
      (error: any) => {
        console.log('Error::', error);
      });
  }

  private goToNewRequestPage() {
    this.loader.setContent("New Request");
    // this.showLoading();
    this.navCtrl.setRoot(NewRequestPage);
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
}
