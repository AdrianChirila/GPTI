import {Component} from '@angular/core';

import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {PatientService} from "../../providers/patient.service";
import {HomePage} from "../../pages/home/home"
import {Patient} from "../../domain/patient"
import {ShareService} from "../../services"
@Component({
  selector: 'patient-detail',
  templateUrl: 'patient.detail.html'
})
export class PatientDetailPage {
  private patient: Patient;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public loadController: LoadingController,
              public shareService: ShareService) {
    this.patient = shareService.getSelectedPatient();
  }

  doSomething() {
    console.log('Click!');
  }

  displayHearthRate() {
    console.log('Hearth rate!');
  }
}
