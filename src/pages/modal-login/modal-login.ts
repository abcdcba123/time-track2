import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'modal-login.html'
})
export class ModalLogin {
    loginForm = {
        phone:'',
        password:''
    };

    constructor(
        public viewCtrl: ViewController
    ){}

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
