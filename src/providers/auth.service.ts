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

  constructor(public http: Http) {
    logger.log(`Auth Services started!`);
  }

  public logIn(cnp: string, password: string) {
    let sessionUrl: string = `${SERVER_ADDRESS}${URLS.PUBLIC}${URLS.AUTH}${URLS.SESSION}`
    logger.log(`Authenticate via http: ${cnp} - ${password}`);
    let body: any = {pid: cnp, password: password}
      return this.http
        .post(sessionUrl, JSON.stringify(body), {headers: this.headers})
        .map((res: any) => {
          let parsedRespone: any = res.json();
          // logger.log(`Str response: ${parsedRespone.stringify()}`);
          logger.log(`Response from server with status ${parsedRespone.status} : ${parsedRespone.token}`);
          this.token = parsedRespone.token;
        })
        .catch((r: Response) => r.status == 404 || r.status == 400 ?
          Observable.throw(new Error("No deal found!")) :
          Observable.throw(new Error("Service unavailable")));
  }

  public getToken(){
    return this.token
  }

  private loadState() {

  }
}
