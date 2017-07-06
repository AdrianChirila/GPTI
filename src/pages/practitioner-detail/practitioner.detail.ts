import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, Loading} from "ionic-angular";
import {PatientService} from "../../providers/patient.service";
import {ShareService} from "../../services";
import {PractitionerService} from "../../providers/practitioner.service";
@Component({
  selector: 'practitioner-detail',
  templateUrl: 'practitioner.detail.html'
})
export class PractitionerDetailPage {
  private loader: Loading;
  private firstName: string;
  private lastName: string;
  private phone: string;
  private mail: string;
  private patientMode: boolean;
  private practitionerMode: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService: PatientService,
              public practitionerService: PractitionerService,
              public loadController: LoadingController,
              public shareService: ShareService) {
    console.log('Patient detail page constructor!!!?');
    if (this.shareService.getAppMode() == 'practitioner')
      this.practitionerMode = true;
    else
      this.patientMode = true;
  }
  private ionViewDidLoad() {
    console.log('Ion view did load!');
  }
  private ionViewWillEnter() { // THERE IT IS!!!
    this.practitionerService.fetchGeneralPractitioner(this.shareService.getToken()).subscribe((event: any) => {
        console.log('Done!', event);
        let targetPractitioner = this.practitionerService.getTargetPractitioner();
        this.firstName = targetPractitioner.name[0].family;
        this.lastName = targetPractitioner.name[0].given;
        this.phone = targetPractitioner.telecom[0].value;
        this.mail = targetPractitioner.telecom[1].value;
        // this.patient = [this.patientService.getTargetPatient()];
        // callback(null, this.patient);
        // this.hideLoading();
      },
      (error: any) => {
        console.log('Error::', error);
        // callback(error);
      })
  }

  private showLoading() {
    this.loader.present();
  }
  private hideLoading() {
    this.loader ? this.loader.dismiss() : true;
  }
  public updateData() {

  }
}
