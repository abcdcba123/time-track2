import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController, ActionSheetController, ViewController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';

import {TrackService} from "./../../../providers/TrackService";
import {TrackListPage} from "../track-list/track-list";
import {Events} from 'ionic-angular';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {ImageService} from "../../../providers/ImageService";
import {File} from "@ionic-native/file";
import {HttpService} from "../../../providers/HttpService";
import {UploaderService} from "../../../providers/UploaderService";


@Component({
    selector: 'page-track-edit',
    templateUrl: 'track-edit.html',
    providers: [TrackService]
})
export class TrackEditPage {

    trackEditForm: any;

    constructor(public navCtrl: NavController,
                public events: Events,
                public navParams: NavParams,
                private trackService: TrackService,
                public actionSheetCtrl: ActionSheetController,
                private popoverCtrl: PopoverController,
                private formBuilder: FormBuilder,
                private transfer: FileTransfer,
                private imageService: ImageService,
                private httpService: HttpService,
                private uploaderService: UploaderService,
                private file: File) {
        var trackId = navParams.get('trackId');
        var themeId = navParams.get('themeId');
        if (trackId == null) {
            this.trackEditForm = this.formBuilder.group({
                trackId: [''],
                themeId: [themeId, [Validators.required]],
                trackDate: new Date(),
                trackDateTime: new Date(),
                content: '',
                style: '',
                fileList: []
            });
        } else {
            this.getTrackInfo(trackId);
        }
    }

    uploadTest(input: HTMLInputElement) {
        const file = input.files[0];
        console.log(file);
        if (file) {
            this.uploaderService.upload(file).then(data => {
                console.log(data);
            });
            // this.httpService.httpPostUploadWithAuth('/core/UploadController/uploadTrackImg',file).then(data => {
            //     console.log(data);
            // });
        }
    }

    upload() {
        const fileTransfer: FileTransferObject = this.transfer.create();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'name.jpg',
            headers: {}
        }

        fileTransfer.upload('<file path>', '<api endpoint>', options)
            .then((data) => {
                console.log(data)
                // success
            }, (err) => {
                // error
                console.log(data)
            })
    }

    getTrackInfo(trackId: any) {
        this.trackService.trackInfo(trackId).then(data => {
            console.log(data);
            this.user = data.Result;
            if (typeof(data) == 'object' && typeof(data.code) == 'string' && data.code == 'OK') {
                // console.log(data.data);
                // this.trackEditForm = this.formBuilder.group({
                //     trackId: [data.data.track_id],
                //     themeId: [data.data.theme_id, [Validators.required]],
                //     trackDate: data.data.track_date,
                //     trackDateTime: data.data.track_date_time,
                //     content: data.data.content,
                //     style: data.data.style,
                //     fileLis: data.data.style
                // });
            } else {
                alert('系统错误.');
            }
        });
    }

    saveTrackInfo(trackInfo) {
        console.log(trackInfo);
        console.log(this.trackService);
        this.trackService.editTrackInfo(trackInfo).then(data => {
            console.log(data);
            trackInfo.trackId = data.data.track_id;
            this.events.publish('track:created', trackInfo);
            this.navCtrl.popTo(TrackListPage);
        });
    }

    uploadTrackImg() {
        this.imageService.showPicActionSheet();
    }


    ionViewDidLoad() {
        console.log('Hello track-edit Page');
    }

}