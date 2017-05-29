import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading, PopoverController} from 'ionic-angular';
import {PatientDetailPage} from "../patient-details/patient.details";
import {NewRequestPage} from "../request/new-request";
import {PatientService} from "../../providers/patient.service";
import {ShareService} from "../../services/share.service"
import {AppointmentService} from "../../providers/appointment.service";
import {APP_MODES} from "../../utils/app.modes";
import {PopoverPage} from "../popover/popover.page";
import {PractitionerPopOverPage} from "../popover/practitioner.popover.page";
import {CreateAppointmentPage} from "../appointment/create.appointment";
import {SchedulePage} from "../schedule/schedule";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private loader: Loading;
  private appointments: any[];
  private practitionerMode: boolean;
  private patientMode: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService,
              public popoverCtrl: PopoverController) {
    console.log('Constructor!');
  }

  presentPopover(myEvent) {
    let popover: any;
    if (this.practitionerMode)
      popover = this.popoverCtrl.create(PractitionerPopOverPage);
    else
      popover = this.popoverCtrl.create(PopoverPage);

    popover.present({
      ev: myEvent
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
    // console.log('Go to patient Details!', patient.name.family);
    // this.showLoading();
    this.navCtrl.setRoot(PatientDetailPage);
    // this.hideLoading();
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

  public goToGeneralPractitionerInformation() {

  }

  private decideAppMode() {
    console.log('Share service, app mode:', this.shareService.getAppMode());
    if (this.shareService.getAppMode() == APP_MODES.Practitioner) {
      console.log('Practitioner mode on!');
      this.practitionerMode = true
    } else
      this.patientMode = true;
  }

  private getSuggestionForAppointment() {
    console.log('Get suggestion for appointment!');
  }

  private ionViewDidLoad() {
    console.log('IOn view did load!');
  }

  private ionViewWillEnter() {
    console.log('Ion view will enter!');
    this.decideAppMode();
    console.log('mode:::', this.patientMode);
    this.loader = this.loadController.create({
      content: "Patient details"
    });
    this.showLoading();
    // this.fetchPatients();
    this.fetchAppointments();
    this.appointments = this.appointmentService.getAppointments();
    console.log('xxx Appointments xxx', this.appointments);
  }
  private goToSchedulePage() {
    console.log('Go to schedule page!');
    this.navCtrl.push(SchedulePage)
  }
  private askForAppointment() {
    console.log('Ask for appointment!');
    this.navCtrl.push(CreateAppointmentPage);
  }
  private requestForAppointment() {
    console.log('Req for appointment');

  }

  private ionViewDidEnter() {
    console.log('Ion did will enter!');
  }

  private ionViewWillLeave() {
    console.log('Ion view will leave!');
  }

  private ionViewDidLeave() {
    console.log("Ion view did leave!");
  }

  private ionViewWillUnload() {
    console.log('Ion view will unload!');
  }
}
