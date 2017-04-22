import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {LoginPage} from "../pages/auth/login";
import {ShareService} from "../services";

@Component({
  templateUrl: 'app.html',
  providers: [ShareService]
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, private shareService: ShareService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
