import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {PatientDetailPage} from "../patient-details/patient.details";
import {NewRequestPage} from "../request/new-request";
import {PatientService} from "../../providers/patient.service";
import {Patient} from "../../domain/patient";
import {ShareService} from "../../services/share.service"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  loader: Loading;
  patients: any [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public loadController: LoadingController,
              public shareService: ShareService) {
    this.loader = this.loadController.create({
      content: "Patient details"
    });
    console.log('Home Constructor!');
    this.showLoading();
    this.fetchPatients();
    this.patients = patientService.getPatients();
  }

  private showLoading(){
    this.loader.present();
  }

  private hideLoading(){
    this.loader ? this.loader.dismiss() : true;
  }

  goToPatientDetails(patient: Patient) {
    this.shareService.setSelectedPatient(patient);
    console.log('Go to patient Details!', patient.name.family);
    // this.showLoading();
    setTimeout(() => {
      this.navCtrl.setRoot(PatientDetailPage);
    }, 1000);
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

  private goToNewRequestPage() {
    this.loader.setContent("New Request");
    this.showLoading();
    this.navCtrl.setRoot(NewRequestPage);
    this.hideLoading();
  }
}
