import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading} from "ionic-angular";
import {ShareService} from "../../services/share.service";
import {AppointmentService} from "../../providers/appointment.service";

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  loader: Loading;
  private appointments: any[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadController: LoadingController,
              public shareService: ShareService,
              public appointmentService: AppointmentService) {
  }
}
