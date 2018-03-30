import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs/Observable';

import {HttpService} from "./HttpService";
import {StorageService} from "./StorageService";

@Injectable()
export class UserInfoService {
    API_URL = "http://localhost:1856/api";

    constructor(
                private http: HttpClient,
                private httpService: HttpService,
                private storageService: StorageService) {
    }

    login(user) {
        var url = this.API_URL + "/UserLogin";
        return this.httpService.httpPostNoAuth(url, user);
    }


    GetUserInfo(id: number) {
        var url = this.API_URL + "/UserInfo/" + id;
        return this.httpService.httpGetWithAuth(url);
    }
}