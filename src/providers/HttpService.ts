import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";

import 'rxjs/add/operator/toPromise';

import { StorageService } from "./StorageService";
import { UserInfoData } from "./../model/UserInfoData";

@Injectable()
export class HttpService {
    myInfoLocal: any;
    firstUrl = "http://mytest.my.com/ionic/back/time-track/index.php";
    local: Storage;
    constructor(
        private http: HttpClient,
        private storageService: StorageService) {
        //this.local = new Storage(LocalStorage);
    }

    public httpGetWithAuth(url: string, params: any) {
        url = this.firstUrl+url;
        console.log(url);
        params = params || {};
        params.token = this.storageService.read<string>('token');
        // var headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/json');
        return this.http.get(url, {params:params}).toPromise()
            .catch(err => {
                this.handleError(err);
            });
    }
    public httpGetNoAuth(url: string, params: any) {
        url = this.firstUrl+url;
        console.log(url);
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(url, {headers, params:params}).toPromise()
            .catch(err => {
                this.handleError(err);
            });
    }
    public httpPostNoAuth(url: string, body: any, ) {
        url = this.firstUrl+url;
        console.log(url);
        var headers = new HttpHeaders();
        console.log(body);
        // headers.append('Content-Type', 'application/json');
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body).toPromise()
            .catch(err => {
                // this.handleError(err);
                console.log(err);
            });
    }

    public httpPostUploadWithAuth(url:string,file: File) {
        if (!file) {
            return;
        }
        url = this.firstUrl+url+'?token='+this.storageService.read<string>('token');
        console.log(url);
        // COULD HAVE WRITTEN:
        // return this.http.post('/upload/file', file, {
        //   reportProgress: true,
        //   observe: 'events'
        // }).pipe(

        // Create the request object that POSTs the file to an upload endpoint.
        // The `reportProgress` option tells HttpClient to listen and return
        // XHR progress events.
        const req = new HttpRequest('POST', url, file, {
            reportProgress: true
        });

        // The `HttpClient.request` API produces a raw event stream
        // which includes start (sent), progress, and response events.
        return this.http.request(req).toPromise()
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
        // return Observable.of(error.json().error || 'Server Error');
    }
}