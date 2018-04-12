import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {StorageService} from "./StorageService";
import { FileUploader } from 'ng2-file-upload';

@Injectable()
export class UploaderService {

    public uploader:FileUploader;

    constructor(private http: HttpClient,
                private storageService: StorageService) {
    }

    // If uploading multiple files, change to:
    // upload(files: FileList) {
    //   const formData = new FormData();
    //   files.forEach(f => formData.append(f.name, f));
    //   new HttpRequest('POST', '/upload/file', formData, {reportProgress: true});
    //   ...
    // }

    // selectedFileOnChanged(event) {
    //     this.uploader.queue[0].onSuccess = function (response, status, headers) {
    //         // 上传文件成功
    //         if (status == 200) {
    //             console.log(response)
    //             let tempRes = JSON.parse(response);
    //         } else {
    //             // 上传文件后获取服务器返回的数据错误
    //             alert("");
    //         }
    //     };
    //     this.uploader.queue[0].upload(); // 开始上传
    // }

    upload(file: File) {
        if (!file) {
            return;
        }
        // let reader = new FileReader();
        // reader.readAsDataURL(file);
        // console.log(111);
        // reader.onloadstart = function() {
        //     console.log(2224);
        // }.bind(this);
        // console.log(reader);
        // reader.onloadend = function() {
        //     console.log(222);
        //     let base64SplitReg=/^data:image\/(jpeg|png|gif);base64,/;
        //     let base64 = reader.result; // base64就是图片的转换的结果
        //     base64=base64.replace(base64SplitReg,'');
        //     console.log(base64);
        // }.bind(this);
        // console.log(333);
        // console.log(file);


        // COULD HAVE WRITTEN:
        // return this.http.post('/upload/file', file, {
        //   reportProgress: true,
        //   observe: 'events'
        // }).pipe(

        // Create the request object that POSTs the file to an upload endpoint.
        // The `reportProgress` option tells HttpClient to listen and return
        // XHR progress events.

        let url = '/track-admin/index.php/core/UploadController/uploadTrackImg?token' +this.storageService.read<string>('token');
        this.uploader= new FileUploader({
            url: url,
            method: "POST"
        });



        // var fd = new FormData();
        // fd.append( "file", file );
        // const req = new HttpRequest('POST', 'http://mytest.my.com/ionic/back/time-track/index.php/core/UploadController/uploadTrackImg?token' +this.storageService.read<string>('token'), fd, {
        //     reportProgress: true,
        //     headers: { "Content-Type": undefined }
        // });



        //
        // // The `HttpClient.request` API produces a raw event stream
        // // which includes start (sent), progress, and response events.
        // return this.http.request(req).toPromise()
        //     .catch(err => {
        //         this.handleError(err);
        //     });
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