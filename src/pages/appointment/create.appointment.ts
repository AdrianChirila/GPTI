import {Component} from "@angular/core";
import {
  NavController, NavParams, LoadingController, Loading, PopoverController, Platform,
  ViewController, ModalController, ToastController
} from "ionic-angular";
import {PatientService} from "../../providers/patient.service";
import {ShareService} from "../../services/share.service";
import {AppointmentService} from "../../providers/appointment.service";
import {weeks, DAY} from "../schedule/week";
import {SlotService} from "../../providers/slot.service";
import {AppointmentDetailPage} from "./detail/appointment.detail";

@Component({
  selector: 'create-appointment',
  templateUrl: 'create.appointment.html',
})
export class CreateAppointmentPage {
  private loader: Loading;
  private days: any [];
  private practitionerFreeSlots: any[];
  private slotsHasArrived: boolean;
  private booked: boolean = false;
  private pending: boolean = false;
  private appointments: any [];
  private appointmentsHasArrived: boolean;
  private bookedAppointment: any = null;
  private pendingAppointment: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public slotService: SlotService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    console.log('Create appointment : Constructor!');
    this.slotsHasArrived = false;
    this.days = weeks;
  }
  public showAppointmentDetail() {
    this.navCtrl.push(AppointmentDetailPage);
  }
  public getTime(date: Date) {
    date = new Date(date);
    var h: any = (date.getHours() < 10 ? '0' : '') + date.getHours();
    var m: any = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return `${h} : ${m}`
  }

  openModal(characterNum) {
    if (this.booked || this.pending) {
      let message: string;
      if (this.booked)
        message = 'Aveti deja o programare aprobata!';
      else
        message = 'Aveti deja o programare in cerere!';
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return;
    }

    let modalArgs: any = {
      characterNum: characterNum,
      token: this.shareService.getToken()
    };

    let modal = this.modalCtrl.create(ModalAppointmentContentPage, modalArgs);
    modal.present();
  }

  private showLoading() {
    this.loader.present();
  }

  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }

  public creeateAppointment() {
    console.log('Create appointment!');
  }

  private fetchAppointments() {
    return new Promise((resolve, reject) => {
      let targetAppointmentsStatus = `booked||pending`;
      this.appointmentService.fetchAppointments(targetAppointmentsStatus, this.shareService.getToken()).subscribe((event) => {
        console.log('Appointments:::', this.appointmentService.getAppointments());
        resolve(this.appointmentService.getAppointments());
      });
    });
  }

  private fecthFreeSlots() {
    return new Promise((resolve, reject) => {
      this.slotService.getSlotsForGeneralPractitioner(this.shareService.getGeneralPractitioner(), this.shareService.getToken()).subscribe((event) => {
          // this.practitionerFreeSlots = this.slotService.getPractitionerFreeSlots();
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
    console.log('Create appointment : Ion view did load!');
    this.fecthFreeSlots().then((data: any) => {
      this.slotsHasArrived = true;
      this.practitionerFreeSlots = data;
    });

    this.fetchAppointments().then((data: any) => {
      this.booked = false;
      this.pending = false;
      this.appointments = data;
      this.appointmentsHasArrived = true;
      this.appointments.forEach((appointment: any) => {
        if (appointment.status == 'booked') {
          this.bookedAppointment = appointment;
          this.booked = true;
        }
        if (appointment.status == 'pending') {
          this.pendingAppointment = appointment;
          this.pending = true;
        }
      });
    });
    //appointmentService
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

@Component({
  selector: 'modal-content',
  // templateUrl: 'modal-content.html'
  template: `
  <ion-header>
  <ion-toolbar>
  <ion-navbar>
   <ion-title>
  <h2>{{day.name}}</h2>
  </ion-title>
</ion-navbar>
  </ion-toolbar>
  </ion-header>
  <ion-content>
  <ion-list>
  <ion-item>
  <ion-label>Inceput programare</ion-label>
  <ion-datetime displayFormat="hh:m:A" [(ngModel)]="start"></ion-datetime>
  </ion-item>
  <button id = "setSchedule" ion-button (click)="setSchedule()">
  Seteaza
  </button>
  </ion-list>
  </ion-content>`
})
export class ModalAppointmentContentPage {
  private day: any;
  private token: string;
  private start: string;
  private end: string;
  private dayOfWeekindex: number;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public appointmentService: AppointmentService) {
    this.dayOfWeekindex = this.params.data.characterNum.charNum;
    this.token = this.params.data.token;
    this.day = weeks[this.dayOfWeekindex];
  }

  getLastDayOfWeek(d, dayOfWeek) {
    d = new Date(d);
    let day = d.getDay();
    // let diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    // let diff = d.getDate() - day + (day == 0 ? -6 : dayOfWeek); // adjust when day is sunday
    let diff = d.getDate() - day + dayOfWeek; // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  private makeScheduleFor(day: number) {
    let appointmentDate: Date = this.getLastDayOfWeek(new Date(), day + 1);
    let startHour: number = parseInt(this.start.split(":")[0]);
    let startMinutes: number = parseInt(this.start.split(":")[1]);
    appointmentDate.setHours(startHour, startMinutes);
    console.log('Appointment date::', appointmentDate);
    this.appointmentService.create(this.token, appointmentDate, null)
      .subscribe((event: any) => {
        console.log('Appointment has been propose for request!');
      }, (error: any) => {
        console.log('Could not post appointment!', error);
      });
  }

  setSchedule() {
    try {
      switch (this.dayOfWeekindex) {
        case DAY.MONDAY:
          this.makeScheduleFor(DAY.MONDAY);
          break;
        case DAY.TUESDAY:
          this.makeScheduleFor(DAY.TUESDAY);
          break;
        case DAY.WEDNESDAY:
          this.makeScheduleFor(DAY.WEDNESDAY);
          break;
        case DAY.THURSDAY:

          this.makeScheduleFor(DAY.THURSDAY);
          break;
        case DAY.FRIDAY:
          this.makeScheduleFor(DAY.FRIDAY);
          break;
        default:
          break
      }
    } catch (err) {
      console.log('Invalid date!');
    }
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
