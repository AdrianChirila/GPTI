import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {HEADERS} from "../utils/headers";
import {getLogger, ConsoleLogger} from "../utils/console-logger";
import {SERVER_ADDRESS, URLS} from "./endpoints";
import {Observable} from "rxjs";
const logger: ConsoleLogger = getLogger('AppointmentService: ');
export const APPOINTMENT_STATUS = {
  BOOKED: 'booked',
  PENDING: 'pending',
  FINISHED: 'finished',
  CANCELLED: 'cancelled'
};

@Injectable()
export class AppointmentService {
  private headers: Headers = new Headers(HEADERS.CONTENT_TYPE);
  private appointments: any [] = [];
  private appointmentApi: string = `${SERVER_ADDRESS}${URLS.API}${URLS.APPOINTMENT}`;

  constructor(public http: Http) {
    logger.log('AppointmentService !');
  }

  private parseAppointments(appointments: any[]) {
    // this.appointments = [];
    appointments.forEach((appointment: any) => {
      this.appointments.push(appointment);
    });
  };

  public getAppointments() {
    return this.appointments;
  }
  public book(token: string, appointment: any) {
    this.headers.set(HEADERS.AUTHORIZATION, token);
    logger.log(`Update Appointments via http`);
    appointment.status = 'booked';
    return this.http
      .put(`${this.appointmentApi}/${appointment._id}`, appointment, {headers: this.headers})
      .map((res: any) => {

      });
  }

  public finish(token: string, appointment: any) {
    this.headers.set(HEADERS.AUTHORIZATION, token);
    logger.log(`Update Appointments via http`);
    appointment.status = 'fulfilled	';
    return this.http
      .put(`${this.appointmentApi}/${appointment._id}`, appointment, {headers: this.headers})
      .map((res: any) => {

      });
  }

  public reject(token: string, appointment: any) {
    this.headers.set(HEADERS.AUTHORIZATION, token);
    logger.log(`Update Appointments via http`);
    appointment.status = 'cancelled';
    return this.http
      .put(`${this.appointmentApi}/${appointment._id}`, appointment, {headers: this.headers})
      .map((res: any) => {

      });
  }

  public create(token: string, appointment: any) {
    this.headers.set(HEADERS.AUTHORIZATION, token);
    // if (!this.headers.has(HEADERS.AUTHORIZATION))
    //   this.headers.append(HEADERS.AUTHORIZATION, token);
    logger.log(`Post Appointments via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .post(`${this.appointmentApi}`, appointment ,{headers: this.headers})
      .map((res: any) => {
        let parsedResponse: any = res.json();
        console.log('Appointment from server!', parsedResponse);
        // this.parsePatients(parsedResponse);
        // logger.log(`Str response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedResponse.status}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }

  public fetchAppointments(status: string, token: string) {
    this.appointments = [];
    this.headers.set(HEADERS.AUTHORIZATION, token);
    // if (!this.headers.has(HEADERS.AUTHORIZATION))
    //   this.headers.append(HEADERS.AUTHORIZATION, token);
    logger.log(`fetch Appointments via http`);
    // let body: any = {pid: cnp, password: password}
    return this.http
      .get(`${this.appointmentApi}?status=${status}`, {headers: this.headers})
      .map((res: any) => {
        let parsedResponse: any = res.json();
        this.parseAppointments(parsedResponse);
        // this.parsePatients(parsedResponse);
        // logger.log(`Str response: ${parsedRespone.stringify()}`);
        logger.log(`Response from server with status ${parsedResponse.status}`);
      })
      .catch((r: Response) => r.status == 404 || r.status == 400 ?
        Observable.throw(new Error("No deal found!")) :
        Observable.throw(new Error("Service unavailable")));
  }
}
