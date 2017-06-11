import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
@Component({
  template: `
    <ion-list>
      <ion-list-header>Ionic</ion-list-header>
      <button ion-item (click)="close()">Close</button>
      <button ion-item (click)="logOut()">Log out</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
  logOut() {
  }
}
