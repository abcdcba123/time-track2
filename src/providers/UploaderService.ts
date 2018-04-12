import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {StorageService} from "./StorageService";
import { FileUploader } from 'ng2-file-upload';
import {AppConfig} from "../app/app.config";

@Injectable()
export class UploaderService {

    public uploader:FileUploader;

    constructor(private http: HttpClient,
                private storageService: StorageService) {
        this.initUpload();
    }

    initUpload() {
        this.uploader = new FileUploader({
            url: AppConfig.getProdBackAdminUrl() + "/index.php/core/UploadController/uploadTrackImg?token=" + this.storageService.read<string>('token'),
            method: "POST",
            itemAlias: "track_img"
        });
    }
    


    upload(file: File) {
        if (!file) {
            return;
        }
    }

    /**
     * Returns a function that handles Http upload failures.
     * @param file - File object for file being uploaded
     *
     * When no `UploadInterceptor` and no server,
     * you'll end up here in the error handler.
     */
    private handleError(file: File) {
        alert('upload failed.')
    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/