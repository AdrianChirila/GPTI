import {Component} from '@angular/core';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {weeks} from "./week";
@Component({
  templateUrl: 'schedule.html'
})
export class BasicPage {
  constructor(public modalCtrl: ModalController) {
  }

  openModal(characterNum) {

    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
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
  day: any;
  private startProgram: string;
  private endProgram: string;
  private startDate: Date;
  private endDate: Date;
  private dayOfWeekindex: number;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public slotService: SlotService) {
    this.dayOfWeekindex = this.params.get('charNum');
    this.day = weeks[this.dayOfWeekindex];
  }

  getLastDayOfWeek(d, dayOfWeek) {
    d = new Date(d);
    console.log('DATE:::', d);
    let day = d.getDay();
    console.log('Day of week: ', day);
    // let diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    let diff = d.getDate() - day + (day == 0 ? -6 : dayOfWeek); // adjust when day is sunday
    console.log('Diff', diff);
    return new Date(d.setDate(diff));
  }

  setSchedule() {
    try {
      switch (this.dayOfWeekindex + 1) {
        case 1:
          this.startDate = this.getLastDayOfWeek(new Date(), 1);
          this.endDate = this.getLastDayOfWeek(new Date(), 1);
          let startHour: number = parseInt(this.startProgram.split(":")[0]);
          let startMinutes: number = parseInt(this.startProgram.split(":")[1]);
          let endHour: number = parseInt(this.endProgram.split(":")[0]);
          let endMinutes: number = parseInt(this.endProgram.split(":")[1]);
          this.startDate.setHours(startHour, startMinutes);
          this.endDate.setHours(endHour, endMinutes);
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
