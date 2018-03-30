import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {HttpService} from "./HttpService";
import {StorageService} from "./StorageService";

@Injectable()
export class UserInfoService {
    API_URL = "http://testtimetrack.test.com/index.php";

    constructor(private http: HttpClient,
                private httpService: HttpService,
                private storageService: StorageService) {
    }

    login(user) {
        var url = this.API_URL + "/public/core/login";
        return this.httpService.httpPostNoAuth(url, user);
    }


    GetUserInfo(id: number) {
        var url = this.API_URL + "/UserInfo/" + id;
        return this.httpService.httpGetWithAuth(url);
    }
}