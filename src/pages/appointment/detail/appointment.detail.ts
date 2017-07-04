import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading} from "ionic-angular";
import {PatientService} from "../../../providers/patient.service";
import {Patient} from "../../../domain/patient";
import {ShareService} from "../../../services";
import {AppointmentService} from "../../../providers/appointment.service";
import {NewRequestPage} from "../../request/new-request";
@Component({
  selector: 'appointment-detail',
  templateUrl: 'appointment.detail.html'
})
export class AppointmentDetailPage {
  private loader: Loading;
  private patient: Patient;
  private targetAppointment: any = null;
  private patientHasArrived: boolean = false;
  private beforeHome: boolean;
  private beforeNewRequest: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService) {
   if (this.shareService.getBeforeAppointmentDetail() == 'home') {
     this.beforeHome = true;
     this.beforeNewRequest =false;
   }
   else  {
     this.beforeNewRequest = true;
     this.beforeHome = false;
   }
  }
  private ionViewDidLoad() {
    console.log('Ion view did load!');
  }
  private ionViewWillEnter() { // THERE IT IS!!!
    console.log('Ion view will Enter');
    this.targetAppointment = this.shareService.getSelectedAppointment();
    this.fetchP();
    // this.fetchPatient(this.shareService.getSelectedPatient(), (patient: any) => {
    //   console.log('Patient::', patient);
    //   this.targetPatient = patient;
    //   this.patientHasArrived = true;
    // });
  }

  public fetchP() {
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
        this.patient = this.patientService.getTargetPatient();
        console.log('Patient::', this.patient);
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
  private acceptAppointment() {
    this.appointmentService.book(this.shareService.getToken(), this.shareService.getSelectedAppointment()).subscribe((event: any)=> {
      console.log('Appointment was made!');
      this.navCtrl.pop();
      // this.navCtrl.setRoot(NewRequestPage);
    });
  }
  private finishAppointment() {
    console.log("xxxx::: FINISHED APPOINTMENT");
    this.appointmentService.finish(this.shareService.getToken(), this.shareService.getSelectedAppointment()).subscribe((event: any)=> {
      console.log('Appointment was finished!');
      this.navCtrl.pop();
      // this.navCtrl.setRoot(NewRequestPage);
    });
  }
  private rejectAppointment() {
    this.appointmentService.reject(this.shareService.getToken(), this.shareService.getSelectedAppointment()).subscribe((event: any)=> {
      console.log('Appointment was rejected!');
      this.navCtrl.pop();
      // this.navCtrl.setRoot(NewRequestPage);
    });
    console.log('Reject appointment!');
  }
  public eraseTimeZone(date: any) {
    return new Date(date).toLocaleTimeString([], {month: 'long', day: '2-digit', hour: '2-digit', minute:'2-digit'});
  }
  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }

}
