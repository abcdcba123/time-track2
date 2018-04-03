import {Injectable} from '@angular/core';

import {HttpService} from "./HttpService";
import {StorageService} from "./StorageService";
import {UserInfoData} from "../model/UserInfoData";

@Injectable()
export class UserInfoService {

    constructor(private httpService: HttpService) {
    }

    login(user) {
        var url = "/public/core/login";
        return this.httpService.httpGetNoAuth(url, user);
    }

    GetUserInfo() {
        var url = "/core/UserController/getUserInfo";
        return this.httpService.httpGetWithAuth(url,{});
    }
}