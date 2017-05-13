import {Component} from '@angular/core';

import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {PatientService} from "../../providers/patient.service";
import {HomePage} from "../../pages/home/home"
import {Patient} from "../../domain/patient"
import {ShareService} from "../../services"
import {AppointmentService} from "../../providers/appointment.service";
import {NewRequestPage} from "../request/new-request";
@Component({
  selector: 'patient-detail',
  templateUrl: 'patient.detail.html'
})
export class PatientDetailPage {
  private loader: Loading;
  private patient: Patient;

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
    console.log('Get selected patient!', this.shareService.getSelectedPatient());
    this.fetchPatient(this.shareService.getSelectedPatient());
    console.log('Fetch selected patient!');
    this.patient = patientService.getTargetPatient();
    this.patient = new Patient({"name": {
      "family": "Popescu",
      "given": "Andrei"
    }});
  }

  private fetchPatient(selectedPatient: Patient) {
    this.patientService.fetchPatientById(this.shareService.getToken(), selectedPatient).subscribe((event: any) => {
        console.log('Done!', event);
        this.patient = this.patientService.getTargetPatient();
        console.log('yyyy', this.patient);
        this.hideLoading();
      },
      (error: any) => {
        console.log('Error::', error);
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
