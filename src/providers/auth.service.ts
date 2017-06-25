import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {getLogger, ConsoleLogger} from "../utils/console-logger";
import {URLS, SERVER_ADDRESS} from "./endpoints";
import {HEADERS} from "../utils/headers";
import 'rxjs/Rx';
import {Observable} from "rxjs";

const logger: ConsoleLogger = getLogger('AuthService: ');


@Injectable()
export class AuthService {
  private headers: Headers = new Headers(HEADERS.CONTENT_TYPE);
  private token: string;
  private appMode: string;
  private generalPractitioner: string;

  constructor(public http: Http) {
    logger.log(`Auth Services started!`);
  }

  public logIn(cnp: string, password: string) {
    let sessionUrl: string = `${SERVER_ADDRESS}${URLS.PUBLIC}${URLS.AUTH}${URLS.SESSION}`
    logger.log(`Authenticate via http: ${cnp} - ${password}`);
    let body: any = {pid: cnp, password: password};
      return this.http
        .post(sessionUrl, JSON.stringify(body), {headers: this.headers})
        .map((res: any) => {
          let parsedRespone: any = res.json();
          console.log("xxx", parsedRespone);
          this.appMode = parsedRespone.role;
          // logger.log(`S  tr response: ${parsedRespone.stringify()}`);
          logger.log(`Response from server with status ${parsedRespone.status} : ${parsedRespone.token}`);
          this.token = parsedRespone.token;
          if (parsedRespone.generalPractitioner)
            this.generalPractitioner = parsedRespone.generalPractitioner;
        })
        .catch((r: Response) => r.status == 404 || r.status == 400 ?
          Observable.throw(new Error("No deal found!")) :
          Observable.throw(new Error("Service unavailable")));
  }

  public getToken(){
    return this.token
  }

  public getAppMode() {
    return this.appMode;
  }

  public getGeneralPractitioner() {
    return this.generalPractitioner
  }
}
