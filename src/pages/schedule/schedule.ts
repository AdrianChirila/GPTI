import {Component} from '@angular/core';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {weeks, DAY} from "./week";
import {SlotService} from "../../providers/slot.service";
import {ShareService} from "../../services/share.service";
@Component({
  templateUrl: 'schedule.html'
})
export class BasicPage {
  constructor(public modalCtrl: ModalController,
              public shareService: ShareService) {
  }

  openModal(characterNum) {
    let modalArgs: any = {
      characterNum: characterNum,
      token: this.shareService.getToken()
    }

    let modal = this.modalCtrl.create(ModalContentPage, modalArgs);
    modal.present();
  }
}

@Component({
  selector: 'modal-content',
  // templateUrl: 'modal-content.html'
  template: `
  <ion-header>
  <ion-toolbar>
  <ion-title>
  <h2>{{day.name}}</h2>
  </ion-title>
  </ion-toolbar>

  </ion-header>
  <ion-content>
  <ion-list>
    <ion-item>
  <ion-label color = "primary" stacked>
    Inceput program: 
  </ion-label>
  <ion-input [(ngModel)]="startProgram" placeholder="scrieti ora">
  </ion-input>
  </ion-item>
  
  <ion-item>
  <ion-label color = "primary" stacked>
    Sfarsit program: 
  </ion-label>
  <ion-input [(ngModel)]="endProgram" placeholder="scrieti ora">
  </ion-input>
  </ion-item>
  <button id = "setSchedule" ion-button (click)="setSchedule()">
  Seteaza
  </button>
  </ion-list>
  </ion-content>`
})
export class ModalContentPage {
  private day: any;
  private token: string;
  private startProgram: string;
  private endProgram: string;
  private dayOfWeekindex: number;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public slotService: SlotService) {
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
    let startDate: Date = this.getLastDayOfWeek(new Date(), day + 1);
    let endDate: Date = this.getLastDayOfWeek(new Date(), day + 1);
    let startHour: number = parseInt(this.startProgram.split(":")[0]);
    let startMinutes: number = parseInt(this.startProgram.split(":")[1]);
    let endHour: number = parseInt(this.endProgram.split(":")[0]);
    let endMinutes: number = parseInt(this.endProgram.split(":")[1]);
    startDate.setHours(startHour, startMinutes);
    endDate.setHours(endHour, endMinutes);
    this.slotService.create({status: 'free', start: startDate, end: endDate}, this.token)
      .subscribe((event: any) => {
        console.log('The slot was created!');
      }, (error: any) => {
        console.log('Could not create the slot::', error);
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
