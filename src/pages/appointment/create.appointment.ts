import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading, PopoverController} from "ionic-angular";
import {PatientService} from "../../providers/patient.service";
import {ShareService} from "../../services/share.service";
import {AppointmentService} from "../../providers/appointment.service";

@Component({
  selector: 'create-appointment',
  templateUrl: 'create.appointment.html',
})
export class CreateAppointmentPage {
  private loader: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService,
              public popoverCtrl: PopoverController) {
    console.log('Constructor!');
  }

  // private showLoading() {
  //   this.loader.present();
  // }
  //
  // private hideLoading() {
  //   this.loader ? this.loader.dismiss() : true;
  // }
  //
  // private fetchAppointments() {
  //   this.appointmentService.fetchAppointments('booked', this.shareService.getToken()).subscribe((event: any) => {
  //       console.log('Done!', event);
  //       this.hideLoading();
  //     },
  //     (error: any) => {
  //       console.log('Error::', error);
  //     });
  // }
  //
  //
  // private ionViewDidLoad() {
  //   console.log('IOn view did load!');
  // }
  //
  // private ionViewWillEnter() {
  //   console.log('Create appointment : Ion view will enter!');
  // }
  // private requestForAppointment() {
  //   console.log('Req for appointment');
  //
  // }
  //
  // private ionViewDidEnter() {
  //   console.log('Ion did will enter!');
  // }
  //
  // private ionViewWillLeave() {
  //   console.log('Ion view will leave!');
  // }
  //
  // private ionViewDidLeave() {
  //   console.log("Ion view did leave!");
  // }
  //
  // private ionViewWillUnload() {
  //   console.log('Ion view will unload!');
  // }
}
