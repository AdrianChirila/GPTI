import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {HEADERS} from "../utils/headers";
import {getLogger, ConsoleLogger} from "../utils/console-logger";
import {SERVER_ADDRESS, URLS} from "./endpoints";
import {Observable} from "rxjs";
const logger: ConsoleLogger = getLogger('AppointmentService: ');


@Injectable()
export class ScheduleService {
  private headers: Headers = new Headers(HEADERS.CONTENT_TYPE);
  private schedules: any [] = [];
  private scheduleApi: string = `${SERVER_ADDRESS}${URLS.API}${URLS.SCHEDULE}`;

  constructor(public http: Http) {
    logger.log('Schedule service !');
  }

  public getSchedules() {
    return this.schedules;
  }

  create(planningHorizon: any, token: string) {
    const schedule: any = {
      planningHorizon: planningHorizon
    };

    this.headers.set(HEADERS.AUTHORIZATION, token);
    // if (!this.headers.has(HEADERS.AUTHORIZATION))
    //   this.headers.append(HEADERS.AUTHORIZATION, token);
    logger.log(`Post Appointments via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .post(`${this.scheduleApi}`, schedule ,{headers: this.headers})
      .map((res: any) => {
        let parsedResponse: any = res.json();
        console.log('Schedule from server!', parsedResponse);
        // this.parsePatients(parsedResponse);
        // logger.log(`Str response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedResponse.status}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }

  getScheduleForGeneralPractitioner(generalPractitioner: string, token: string) {
    this.schedules = [];
    this.headers.set(HEADERS.AUTHORIZATION, token);
    // if (!this.headers.has(HEADERS.AUTHORIZATION))
    //   this.headers.append(HEADERS.AUTHORIZATION, token);
    logger.log(`fetch schedule via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .get(`${this.scheduleApi}?generalPractitioner=${generalPractitioner}`, {headers: this.headers})
      .map((res: any) => {
        let parsedResponse: any = res.json();
        console.log('XXX', parsedResponse);
        this.schedules = parsedResponse;
        // this.parseAppointments(parsedResponse);
        // this.parsePatients(parsedResponse);
        // logger.log(`Str response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedResponse.status}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }
}
