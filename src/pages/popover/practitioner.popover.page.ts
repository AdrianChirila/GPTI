import {Component} from "@angular/core";
import {ViewController, NavController} from "ionic-angular";
@Component({
  template: `
    <ion-list>
      <ion-list-header>Optiuni</ion-list-header>
      <button ion-item (click)="goToSettingsPage()">Seteaza programul</button>
      <button ion-item (click)="close()">Adauga pacient</button>
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
    // this.navCtrl.getRootNav().setRoot(SupportPage);
  }
}
