import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/auth/login";
import {AuthService} from "../providers/auth.service";
import {PatientDetailPage} from "../pages/patient-details/patient.details";
import {NewRequestPage} from "../pages/request/new-request";
import {PatientService} from "../providers/patient.service";
import {AppointmentService} from "../providers/appointment.service";
import {PopoverPage} from "../pages/popover/popover.page";
import {PractitionerPopOverPage} from "../pages/popover/practitioner.popover.page";
import {CreateAppointmentPage, ModalAppointmentContentPage} from "../pages/appointment/create.appointment";
import {ContactPage} from "../pages/contact/contact";
import {BasicPage, ModalContentPage} from "../pages/schedule/schedule";
import {SlotService} from "../providers/slot.service";
import {AppointmentDetailPage} from "../pages/appointment/detail/appointment.detail";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    PatientDetailPage,
    NewRequestPage,
    PopoverPage,
    PractitionerPopOverPage,
    CreateAppointmentPage,
    ContactPage,
    BasicPage,
    ModalContentPage,
    ModalAppointmentContentPage,
    AppointmentDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    PatientDetailPage,
    NewRequestPage,
    PopoverPage,
    PractitionerPopOverPage,
    CreateAppointmentPage,
    ContactPage,
    BasicPage,
    ModalContentPage,
    ModalAppointmentContentPage,
    AppointmentDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, PatientService, AppointmentService, SlotService]
})
export class AppModule {}
