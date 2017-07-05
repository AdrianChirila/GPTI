/**
 * Created by adrian on 18.06.2017.
 */
import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, ModalController, ToastController, Loading} from "ionic-angular";
import {ShareService} from "../../services/share.service";
import {AppointmentService} from "../../providers/appointment.service";
import {SlotService} from "../../providers/slot.service";
import {AppointmentDetailPage} from "./detail/appointment.detail";
import {PatientService} from "../../providers/patient.service";

@Component({
  selector: 'create-patient',
  templateUrl: 'create.patient.html',
})

export class CreatePatientPage {
  private loader: Loading;
  private firstName: String;
  private lastName: String;
  private email: String;
  private phoneNumber: String;
  private address: String;
  private cnp: String;

  constructor(/*public navCtrl: NavController,*/
              public navParams: NavParams,
              public slotService: SlotService,
              public patientService: PatientService,
              public loadController: LoadingController,
              public shareService: ShareService,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public navCtrl: NavController) {
  }

  private addPatient() {
    let patient: any = {
      name: {
        family: this.firstName,
        given: this.lastName
      },
      cnp: this.cnp
    };

    this.patientService.add(this.shareService.getToken(), patient).subscribe((event: any) => {
        console.log('Patient was created!');
        this.navCtrl.pop();
      },
      (error: any) => {
        console.log('Could not add patient: ', error);
      });
  }

  public eraseTimeZone(date: any) {
    return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  private showLoading() {
    this.loader.present();
  }

  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }

  private ionViewWillEnter() {
    console.log('Create patient: Ion view will enter!');
  }

  private ionViewDidEnter() {
    console.log('Create appointment : Ion view did enter!');
  }

  private ionViewDidLoad() {

  }

  private ionViewWillLeave() {

  }

  private ionViewDidLeave() {
    console.log("Create appointment : Ion view did leave!");
  }

  private ionViewWillUnload() {
    console.log('Create appointment : Ion view will unload!');
  }
}
