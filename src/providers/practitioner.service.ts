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
export class PractitionerService {
  private headers: Headers = new Headers(HEADERS.CONTENT_TYPE);
  private practitioner: string = `${SERVER_ADDRESS}${URLS.API}${URLS.PRACTITIONER}`;
  private targetPractitioner: any;

  constructor(public http: Http) {
    logger.log(`Practitioner Services started!`);
  }


  fetchGeneralPractitioner(token: string) {
    this.headers.set(HEADERS.AUTHORIZATION, token);
    // if (!this.headers.has(HEADERS.AUTHORIZATION))
    //   this.headers.append(HEADERS.AUTHORIZATION, token);
    logger.log(`fetch Practitioner via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .get(this.practitioner, {headers: this.headers})
      .map((res: any) => {
        let parsedResponse: any = res.json();
        console.log("Practitioner from server:::", parsedResponse);
        console.log("Practitioner from server:::", typeof parsedResponse);
        this.targetPractitioner = parsedResponse;
        // logger.log(`Str response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedResponse.status}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }
  public getTargetPractitioner() {
    return this.targetPractitioner;
  }
}
