import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-request',
  templateUrl: 'new-request.html'
})
export class NewRequestPage {
  loader: Loading;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public noteService: AuthService,
              public loadController: LoadingController) {
  }
  private showLoading(){
    this.loader = this.loadController.create({
      content: "Patient details"
    });

    this.loader.present();
  }

  private hideLoading(){
    this.loader ? this.loader.dismiss() : true;
  }

  private goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}
