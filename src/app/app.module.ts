import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {MyinfoPage} from '../pages/myinfo/myinfo';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpService} from "../providers/HttpService";
import {StorageService} from "../providers/StorageService";
import {HttpClientModule} from "@angular/common/http";
import {TrackListPage} from "../pages/track/track-list/track-list";
import {TrackEditPage} from "../pages/track/track-edit/track-edit";
import {ImagePicker} from '@ionic-native/image-picker';
import {Camera} from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {ImageService} from "../providers/ImageService";
import {UploaderService} from "../providers/UploaderService";
import {FileUploadModule} from 'ng2-file-upload';
import {ThemeEditPage} from "../pages/theme/theme-edit/theme-edit";
import {ThemeService} from "../providers/ThemeService";

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        LoginPage,
        HomePage,
        MyinfoPage,
        TrackListPage,
        TrackEditPage,
        ThemeEditPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FileUploadModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        LoginPage,
        HomePage,
        MyinfoPage,
        TrackListPage,
        TrackEditPage,
        ThemeEditPage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        HttpService,
        StorageService,
        ImageService,
        File,
        FileTransfer,
        Camera,
        ImagePicker,
        FileTransferObject,
        ThemeService,
        UploaderService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
