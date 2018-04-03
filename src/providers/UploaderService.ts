import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class UploaderService {
    constructor(private http: HttpClient) {
    }

    // If uploading multiple files, change to:
    // upload(files: FileList) {
    //   const formData = new FormData();
    //   files.forEach(f => formData.append(f.name, f));
    //   new HttpRequest('POST', '/upload/file', formData, {reportProgress: true});
    //   ...
    // }

    upload(file: File) {
        if (!file) {
            return;
        }

        // COULD HAVE WRITTEN:
        // return this.http.post('/upload/file', file, {
        //   reportProgress: true,
        //   observe: 'events'
        // }).pipe(

        // Create the request object that POSTs the file to an upload endpoint.
        // The `reportProgress` option tells HttpClient to listen and return
        // XHR progress events.
        const req = new HttpRequest('POST', '/upload/file', file, {
            reportProgress: true
        });

        // The `HttpClient.request` API produces a raw event stream
        // which includes start (sent), progress, and response events.
        return this.http.request(req).toPromise()
            .catch(err => {
                this.handleError(err);
            });
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