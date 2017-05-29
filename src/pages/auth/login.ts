import { Component } from '@angular/core';
import {getLogger, ConsoleLogger} from '../../utils'
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";
import {HomePage} from "../home/home";
import {ShareService} from "../../services/share.service";

const logger: ConsoleLogger = getLogger('Log: ');
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private cnp: string;
  private password: string;
  private status: string;
  loader: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              public shareService: ShareService,
              public loadController: LoadingController) {
    logger.log('Constructor: LoginPage');
    this.status = " ";
  }

  private logIn() {
    this.showLoading()
    logger.log(`Try to log in: ${this.cnp} ${this.password}`)
    this.authService.logIn(this.cnp, this.password).subscribe((event: any) => {
      // let parsedEvent: any = event.json();
      this.hideLoading();
      let token: string = this.authService.getToken();
      if (token) {
        logger.log(`Auth with success: ${token}`);
        this.shareService.setToken(token);
        this.shareService.setAppMode(this.authService.getAppMode());
        this.navCtrl.setRoot(HomePage);
      } else {
        logger.log(`Insucces on auth!`);
      }
    },
      (error: any) => {
      console.log('Error::', error);
      this.status = `Error`
      });
  }
  private showLoading(){
    this.loader = this.loadController.create({
      content: "Auth..."
    });

    this.loader.present();
  }

  private hideLoading(){
    this.loader ? this.loader.dismiss() : true;
  }
}
