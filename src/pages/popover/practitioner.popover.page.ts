import {Component} from "@angular/core";
import {ViewController, NavController} from "ionic-angular";
import {LoginPage} from "../auth/login";
@Component({
  template: `
    <ion-list>
      <ion-list-header>Optiuni</ion-list-header>
      <button ion-item (click)="close()">Close</button>
      <button ion-item (click)="logOut()">Log out</button>
    </ion-list>
  `
})
export class PractitionerPopOverPage {
  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  private goToSettingsPage() {
    console.log('Go to settings page!');
  }
  private logOut() {
    // this.navCtrl.push(LoginPage);
  }
}
