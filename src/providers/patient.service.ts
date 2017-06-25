import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {getLogger, ConsoleLogger} from "../utils/console-logger";
import {URLS, SERVER_ADDRESS} from "./endpoints";
import {HEADERS} from "../utils/headers";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Patient} from "../domain/patient";

const logger: ConsoleLogger = getLogger('PatientService: ');


@Injectable()
export class PatientService {
  private headers: Headers = new Headers(HEADERS.CONTENT_TYPE);
  private patients: Patient [] = [];
  private patientApi: string = `${SERVER_ADDRESS}${URLS.API}${URLS.PATIENT}`;
  private targetPatient: Patient;

  constructor(public http: Http) {
    logger.log(`Patient Services started!`);
  }


  private parsePatients(patients: any []) {
    patients.forEach((patient: any) => {
      this.patients.push(new Patient(patient));
    })
  }

  public getPatients() {
    return this.patients;
  }

  public fetchPatients() {
    logger.log(`fetch Patients via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .get(this.patientApi, {headers: this.headers})
      .map((res: any) => {
        let parsedResponse: any = res.json();
        this.parsePatients(parsedResponse);
        // logger.log(`Str response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedResponse.status}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }

  fetchPatientById(token: string, selectedPatient: Patient) {
    this.headers.set(HEADERS.AUTHORIZATION, token);
    // if (!this.headers.has(HEADERS.AUTHORIZATION))
    //   this.headers.append(HEADERS.AUTHORIZATION, token);
    logger.log(`fetch Patients via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .get(this.patientApi + `/${selectedPatient}`, {headers: this.headers})
      .map((res: any) => {
        let parsedResponse: any = res.json();
        console.log("Patient from server:::", parsedResponse);
        this.targetPatient = new Patient(parsedResponse);
        // logger.log(`Str response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedResponse.status}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }

  getTargetPatient() {
    return this.targetPatient;
  }

  add(token: string, patient: any) {
    logger.log(`Post patient via http`);
    this.headers.set(HEADERS.AUTHORIZATION, token);
    return this.http
      .post(this.patientApi, JSON.stringify(patient), {headers: this.headers})
      .map((res: any) => {
        let parsedRespone: any = res.json();
        // logger.log(`S  tr response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedRespone.status} : ${parsedRespone.token}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }
}
