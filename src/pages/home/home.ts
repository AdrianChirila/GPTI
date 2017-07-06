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
import {BasicPage} from "../schedule/schedule";
import {LoginPage} from "../auth/login";
import {CreatePatientPage} from "../patient/create.patient";
import {AppointmentDetailPage} from "../appointment/detail/appointment.detail";
import {PractitionerDetailPage} from "../practitioner-detail/practitioner.detail";
import {displayDate} from "../../utils/date";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private loader: Loading;
  private appointments: any[];
  private practitionerMode: boolean;
  private patientMode: boolean;
  private modeStatus: string;
  private appointMentsHasArived: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService,
              public popoverCtrl: PopoverController) {
    console.log('Constructor!');
  }

  ngOnInit() {
    console.log('Ng on nit!!!!!!!!1', this.shareService.getToken());
    if (!this.shareService.getToken()) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.decideAppMode();
      this.loader = this.loadController.create({
        content: "Patient details"
      });
      this.showLoading();
      // this.fetchPatients();
      this.fetchAppointments().then((data: any)=> {
        this.appointments = data;
        console.log('Appointments::::', this.appointments);
        console.log('Appointments::::', this.appointments.length);
        this.appointMentsHasArived = true;
      });
      // this.navCtrl.setRoot(HomePage);
    }
  }

  private logOut() {
    this.navCtrl.push(LoginPage);
  }
  presentPopover(myEvent) {
    let popover: any = this.popoverCtrl.create(PractitionerPopOverPage);
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

  goToCreatePatientPage() {
    this.navCtrl.push(CreatePatientPage);
  }

  goToPatientDetails(appointment: any) {
    console.log('xxx', appointment);
    this.shareService.setSelectedPatient(this.getPatientFromAppointment(appointment));
    this.shareService.setSelectedAppointment(appointment);
    // console.log('Go to patient Details!', patient.name.family);
    // this.showLoading();
    this.shareService.setBeforeAppointmentDetail('home');
    this.navCtrl.push(AppointmentDetailPage);
    // this.hideLoading();
  }

  private fetchAppointments() {
    return new Promise((resolve: any, reject: any) => {
      this.appointmentService.fetchAppointments('booked', this.shareService.getToken()).subscribe((event: any) => {
          this.hideLoading();
          let appointments: any[] = this.appointmentService.getAppointments();
          appointments.forEach((appointment: any) => {
            appointment.specialDate = displayDate(appointment.date);
          });
          console.log('Apointements :x:::', appointments);
          resolve(appointments);
        },
        (error: any) => {
          console.log('Error::', error);
          reject(error);
        });
    });
  }

  private goToNewRequestPage() {
    this.loader.setContent("New Request");
    // this.showLoading();
    this.navCtrl.push(NewRequestPage);
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
    if (this.shareService.getAppMode() == APP_MODES.Practitioner) {
      console.log('Practitioner mode on!');
      this.practitionerMode = true;
      this.modeStatus = "Programari curente"
    } else {
      this.patientMode = true;
      this.modeStatus = "Programari la medic"
    }
  }

  private getSuggestionForAppointment() {
  }

  private ionViewDidLoad() {
    console.log('IOn view did load!');
  }

  private ionViewWillEnter() {

  }

  private goToSchedulePage() {
    this.navCtrl.push(BasicPage)
  }

  private askForAppointment() {
    this.navCtrl.push(CreateAppointmentPage);
  }

  private requestForAppointment() {
  }
  private goToPractitionerDetailPage() {
    this.navCtrl.push(PractitionerDetailPage);
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
