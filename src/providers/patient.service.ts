import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {getLogger, ConsoleLogger} from "../utils/console-logger";
import {URLS, SERVER_ADDRESS} from "./endpoints";
import {HEADERS} from "../utils/headers";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Patient} from "../domain/patient";

const logger: ConsoleLogger = getLogger('AuthService: ');


@Injectable()
export class PatientService {
  private headers: Headers = new Headers(HEADERS.CONTENT_TYPE);
  private patients: Patient [] = [];

  constructor(public http: Http) {
    logger.log(`Auth Services started!`);
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
    let patientApi: string = `${SERVER_ADDRESS}${URLS.API}${URLS.PATIENT}`
    logger.log(`fetch Patients via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .get(patientApi,{headers: this.headers})
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
}
