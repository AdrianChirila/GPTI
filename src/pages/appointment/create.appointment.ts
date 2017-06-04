import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading, PopoverController} from "ionic-angular";
import {PatientService} from "../../providers/patient.service";
import {ShareService} from "../../services/share.service";
import {AppointmentService} from "../../providers/appointment.service";
import {weeks} from "../schedule/week";
import {SlotService} from "../../providers/slot.service";

@Component({
  selector: 'create-appointment',
  templateUrl: 'create.appointment.html',
})
export class CreateAppointmentPage {
  private loader: Loading;
  private days: any [];
  private practitionerFreeSlots: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public slotService: SlotService,
              public loadController: LoadingController,
              public shareService: ShareService) {
    console.log('Create appointment : Constructor!')

    this.days = weeks;
  }

  private showLoading() {
    this.loader.present();
  }

  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }

  private fetchAppointments() {
  }
  private fecthFreeSlots() {
    return new Promise((resolve, reject) => {
      this.slotService.getSlotsForGeneralPractitioner(this.shareService.getGeneralPractitioner() ,this.shareService.getToken()).subscribe((event) => {
          // this.practitionerFreeSlots = this.slotService.getPractitionerFreeSlots();
          console.log('SLots::: ', this.practitionerFreeSlots);
          console.log('Fetch Slots for general practitioner, done!')
        resolve(this.slotService.getPractitionerFreeSlots())
        },
        (error) => {
          console.log('Could not fetch slots for general practitioner!', error);
          reject();
        })
    })
  }
  private ionViewWillEnter() {
    console.log('Create appointment: Ion view will enter!');
  }

  private ionViewDidEnter() {
    console.log('Create appointment : Ion view did enter!');
  }
  private ionViewDidLoad() {
    console.log('Create appointment : Ion view did load!');
    return this.fecthFreeSlots().then((data: any) => {
      console.log('xxx', data);
      this.practitionerFreeSlots = data;
    })
  }
  private ionViewWillLeave() {
    console.log('Create appointment : Ion view will leave!');
  }

  private ionViewDidLeave() {
    console.log("Create appointment : Ion view did leave!");
  }

  private ionViewWillUnload() {
    console.log('Create appointment : Ion view will unload!');
  }
}
