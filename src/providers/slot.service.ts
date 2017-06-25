import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {HEADERS} from "../utils/headers";
import {getLogger, ConsoleLogger} from "../utils/console-logger";
import {SERVER_ADDRESS, URLS} from "./endpoints";
import {Observable} from "rxjs";
const logger: ConsoleLogger = getLogger('AppointmentService: ');

@Injectable()
export class SlotService {
  private headers: Headers = new Headers(HEADERS.CONTENT_TYPE);
  private appointments: any [] = [];
  private appointmentApi: string = `${SERVER_ADDRESS}${URLS.API}${URLS.APPOINTMENT}`;
  private practitionerFreeSlots: any [];

  constructor(public http: Http) {
    logger.log('Slot Service !');
  }

  public create(slot: any, token: string) {
    if (!this.headers.has(HEADERS.AUTHORIZATION))
      this.headers.append(HEADERS.AUTHORIZATION, token);

    let slotUrl: string = `${SERVER_ADDRESS}${URLS.API}${URLS.SLOT}`;
    console.log('Request to server :', slotUrl);
    console.log('xxx', slot);
    try {
      return this.http
        .post(slotUrl, JSON.stringify(slot), {headers: this.headers})
        .map((res: any) => {
          console.log('Response:::', res);
          let parsedRespone: any = res.json();
          // logger.log(`Str response: ${parsedRespone.stringify()}`);
          logger.log(`Response from server with status ${parsedRespone.status} : ${parsedRespone.token}`);
        });
    } catch (err) {
      console.log('Could not sent to server:::', err);
    }
      // .catch((r: Response) => r.status == 404 || r.status == 400 ?
      //   Observable.throw(new Error("No deal found!")) :
      //   Observable.throw(new Error("Service unavailable")));
  }
  private eraseTimeZone(slots: any[]) {
    for(let index: number = 0; index < slots.length; index ++) {
      slots[index].start = new Date(slots[index].start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      slots[index].end = new Date(slots[index].end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  }
  getSlotsForGeneralPractitioner(generalPractitioner: string, schedule: any, token: string) {
    if (!this.headers.has(HEADERS.AUTHORIZATION))
      this.headers.append(HEADERS.AUTHORIZATION, token);
    let start: string = schedule.planningHorizon.start;
    let end: string = schedule.planningHorizon.end;
    let slotUrl: string = `${SERVER_ADDRESS}${URLS.API}${URLS.SLOT}?generalPractitioner=${generalPractitioner}&schedule=${schedule._id}`;
    console.log('Request to server :', slotUrl);
    try {
      return this.http
        .get(slotUrl, {headers: this.headers})
        .map((res: any) => {
          let parsedRespone: any = res.json();
          // this.eraseTimeZone(parsedRespone);
          this.practitionerFreeSlots = parsedRespone;
          console.log('Parsed response:::', parsedRespone);
          // logger.log(`Str response: ${parsedRespone.stringify()}`)
          logger.log(`Response from server with status ${parsedRespone.status} : ${parsedRespone.token}`);
        });
    } catch (err) {
      console.log('Could not sent to server:::', err);
    }
  }

  getPractitionerFreeSlots() {
    return this.practitionerFreeSlots;
  }
}
