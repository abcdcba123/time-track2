import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { StorageService } from "./StorageService";
import { UserInfoData } from "./../model/UserInfoData";

@Injectable()
export class HttpService {
    myInfoLocal: any;
    local: Storage;
    constructor(
        private http: HttpClient,
        private storageService: StorageService) {
        //this.local = new Storage(LocalStorage);
    }

    public httpGetWithAuth(url: string) {
        let user = this.storageService.read<UserInfoData>('UserInfo');
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', user.ID + '-' + user.UserToken);
        return this.http.get(url, {headers}).toPromise()
            .catch(err => {
                this.handleError(err);
            });
    }
    public httpGetNoAuth(url: string) {

        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(url, {headers}).toPromise()
            .catch(err => {
                this.handleError(err);
            });
    }
    public httpPostNoAuth(url: string, body: any) {
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, body, {headers}).toPromise()
            .catch(err => {
                this.handleError(err);
            });
    }
    // public httpPostWithAuth(body: any, url: string) {

    //     return this.myInfoLocal = this.local.getJson('UserInfo')
    //         .then((result) => {
    //             var headers = new Headers();
    //             headers.append('Content-Type', 'application/json');
    //             headers.append('Authorization', result.ID + '-' + result.UserToken);
    //             let options = new RequestOptions({ headers: headers });
    //             return this.http.post(url, body, options).toPromise();
    //         });
    // }


    private handleError(error: Response) {
        console.log(error);
        // return Observable.throw(error.json().error || 'Server Error');
    }
}