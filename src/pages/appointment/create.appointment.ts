import {Component} from "@angular/core";
import {
  NavController, NavParams, LoadingController, Loading, PopoverController, Platform,
  ViewController, ModalController, ToastController
} from "ionic-angular";
import {PatientService} from "../../providers/patient.service";
import {ShareService} from "../../services/share.service";
import {AppointmentService} from "../../providers/appointment.service";
import {ScheduleService} from "../../providers/schedule.service";
import {weeks, DAY} from "../schedule/week";
import {SlotService} from "../../providers/slot.service";
import {AppointmentDetailPage} from "./detail/appointment.detail";
import {displayDate} from "../../utils/date"

@Component({
  selector: 'create-appointment',
  templateUrl: 'create.appointment.html',
})
export class CreateAppointmentPage {
  private loader: Loading;
  private days: any [];
  private practitionerSchedule: any[];
  private slotsHasArrived: boolean;
  private schedulesHasArrived: boolean;
  private booked: boolean = false;
  private pending: boolean = false;
  private appointments: any [];
  private appointmentsHasArrived: boolean;
  private bookedAppointment: any = null;
  private pendingAppointment: any = null;
  private cancelled: boolean;
  private cancelledAppointment: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public slotService: SlotService,
              public appointmentService: AppointmentService,
              public loadController: LoadingController,
              public shareService: ShareService,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public scheduleService: ScheduleService) {
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
      token: this.shareService.getToken(),
      generalPractitioner: this.shareService.getGeneralPractitioner(),
      schedule: this.practitionerSchedule[characterNum.charNum]
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
      let targetAppointmentsStatus = `booked||pending||cancelled`;
      this.appointmentService.fetchAppointments(targetAppointmentsStatus, this.shareService.getToken()).subscribe((event) => {
        console.log('Appointments:::', this.appointmentService.getAppointments());
        resolve(this.appointmentService.getAppointments());
      });
    });
  }

  private fetchSchedules() {
    return new Promise((resolve, reject) => {
      this.scheduleService.getScheduleForGeneralPractitioner(this.shareService.getGeneralPractitioner(), this.shareService.getToken()).subscribe((event) => {
          resolve(this.scheduleService.getSchedules());
        },
        (error) => {
          console.log('Could not fetch slots for general practitioner!', error);
          reject();
        })
    })
  }
  private ionViewDidLoad() {
    console.log('Ion view did load!');
  }

  private ionViewWillEnter() {
    console.log('Create appointment: Ion view will enter!');
    // this.fetchSchedules();
    this.fetchSchedules().then((data: any) => {
      this.schedulesHasArrived = true;
      this.practitionerSchedule = data;
    });

    this.fetchAppointments().then((data: any) => {
      console.log('Fetch appointment!');
      this.booked = false;
      this.pending = false;
      this.appointments = data;
      this.appointmentsHasArrived = true;
      this.appointments.forEach((appointment: any) => {
        appointment.date = displayDate(appointment.date);
        if (appointment.status == 'booked') {
          this.bookedAppointment = appointment;
          this.booked = true;
          this.appointmentService.settAppointmentHasBeenRequested(false);
        }
        if (appointment.status == 'pending') {
          this.appointmentService.settAppointmentHasBeenRequested(false);
          this.pendingAppointment = appointment;
          this.pending = true;
        } else if (appointment.status == 'cancelled') {
          console.log('Cancel detected!');
          this.cancelledAppointment = appointment;
          this.cancelled = true;
        }

      });
      if (this.booked || this.pending || !this.appointmentService.getAppointmentHasBeenRequested()) {
        console.log('Not Really cancelled');
        this.cancelled = false;
      }
    });
    //appointmentService
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
  <!--<ion-label>Inceput programare</ion-label>
  <ion-datetime id= "ionDateTime" displayFormat="hh:m:A" [(ngModel)]="start"></ion-datetime>-->
  </ion-item>
  <ion-card style="overflow-y: scroll;height: 350px;">
    <ion-label color="primary">Sugestii programare</ion-label>
    <ion-item *ngIf="slotsHasArrived">
          <div *ngFor="let slot of slots;let i = index" >
              <button ion-item color= "{{colors[i]}}" (click)="setSuggestion(slot, i)">
              <ion-icon name="md-calendar" item-left></ion-icon>
              {{eraseTimeZone(slot.start)}} - {{eraseTimeZone(slot.end)}}
              </button>        
          </div>
    </ion-item>
  </ion-card>
   <button id = "setSchedule" ion-button (click)="createAppointment()">
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
  generalPractitioner: any;
  private slotsHasArrived: boolean;
  private slots: any;
  private schedule: any;
  private color: string;
  private numbers: number [];
  private colors: string[];
  private startAppointment: Date;
  private endAppointment: Date;
  private selectedSlot: any;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public appointmentService: AppointmentService,
              public slotService: SlotService,
              public navCtrl: NavController,) {
    console.log('params:::', this.params);
    this.color = "secondary";
    this.dayOfWeekindex = this.params.data.characterNum.charNum;
    this.token = this.params.data.token;
    this.day = weeks[this.dayOfWeekindex];
    this.generalPractitioner = this.params.data.generalPractitioner;
    this.schedule = this.params.data.schedule;
    this.numbers = [];
    this.colors = [];
  }

  setSuggestion(slot: any, index: number) {
    if (this.colors[index] == 'secondary')
      this.colors[index] = 'danger';
    else
      this.colors[index] = 'secondary';
    this.startAppointment = slot.start;
    this.endAppointment = slot.end;
    this.selectedSlot = slot._id;
  }

  getLastDayOfWeek(d, dayOfWeek) {
    d = new Date(d);
    let day = d.getDay();
    // let diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    // let diff = d.getDate() - day + (day == 0 ? -6 : dayOfWeek); // adjust when day is sunday
    let diff = d.getDate() - day + dayOfWeek; // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  private createAppointment(day: number) {
    let appointment: any = {
      start: this.startAppointment,
      end: this.endAppointment,
      date: this.startAppointment,
      slot: this.selectedSlot
    };
    console.log('Appointment:::', appointment);
    this.appointmentService.create(this.token, appointment)
      .subscribe((event: any) => {
      this.appointmentService.settAppointmentHasBeenRequested(true);
        this.navCtrl.pop();
      }, (error: any) => {
        console.log('Could not fetch appointments: ', error);
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private fecthFreeSlots() {
    return new Promise((resolve, reject) => {
      this.slotService.getSlotsForGeneralPractitioner(this.generalPractitioner, this.schedule, this.token).subscribe((event) => {
          let slots: any [] = this.slotService.getPractitionerFreeSlots();
          let index: number = -1;
          slots.forEach((slot: any) => {
            index++;
            if (slot.status == 'free')
                this.colors[index] = 'secondary';
            else if (slot.status == 'pending')
                this.colors[index] = ' #ffff4d';
            this.numbers[index] = index;
          });
          resolve(slots)
        },
        (error) => {
          console.log('Could not fetch slots for general practitioner!', error);
          reject();
        })
    })
  }

  public eraseTimeZone(date: any) {
      return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  private ionViewWillEnter() {
    console.log('Fetch free slots : Ion view will enter');
    this.fecthFreeSlots().then((data: any) => {
      this.slotsHasArrived = true;
      this.slots = data;
    });
  }
}
