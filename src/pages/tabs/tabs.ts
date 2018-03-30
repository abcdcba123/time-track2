import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
// import { ModalLogin } from '../modal-login/modal-login';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
// import { TimeListPage } from '../time-list/time-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = LoginPage;
  // ModalLogin = ModalLogin;

  constructor(public navCtrl: NavController) {

  }
  // presentProfileModal() {
  //     let profileModal = this.modalCtrl.create(TabsPage, { userId: 8675309 });
  //     profileModal.present();
  // }
  //
  // openLoginModal() {
  //     console.log(12313);
  //     // alert(111);
  //     // let myModal = this.modalCtrl.create(ModalLogin);
  //     // myModal.present();
  // }

}
