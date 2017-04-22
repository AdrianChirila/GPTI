var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { getLogger } from "../utils/console-logger";
import { URLS, SERVER_ADDRESS } from "./endpoints";
import { HEADERS } from "../utils/headers";
var logger = getLogger('AuthService: ');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.headers = new Headers(HEADERS.CONTENT_TYPE);
        logger.log("Auth Services started!");
    }
    AuthService.prototype.logIn = function (cnp, password) {
        var sessionUrl = "" + SERVER_ADDRESS + URLS.PUBLIC + URLS.AUTH + URLS.SESSION;
        logger.log("Authenticate via http: " + cnp + " - " + password);
        var body = { cnp: cnp, password: password };
        try {
            /*let post: any =*/ this.http.post(sessionUrl, JSON.stringify(body), { headers: this.headers });
            //   .map((res: any) => {
            //   console.log('xxxxx', res);
            // });
            // this.http
            //   .post(sessionUrl, JSON.stringify(body), {headers: this.headers})
            //   .map((res: any) => {
            //     logger.log(`Response from server: ${res}`);
            //     // receivedNote.quantity = note.quantity;
            //     // this.updateCachedTransaction(receivedNote);
            //   })
            //   .do((data: any) => logger.log(`Data::: ${data}`))
            //   .catch((r: Response) => r.status == 404 || r.status == 400 ?
            //     Observable.throw(new Error("No deal found!")) :
            //     Observable.throw(new Error("Service unavailable")));
        }
        catch (err) {
            console.log('Error:::', err);
        }
        logger.log("Done with auth!");
    };
    AuthService.prototype.loadState = function () {
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map