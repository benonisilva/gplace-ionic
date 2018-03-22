import { Component } from '@angular/core';
import { ModalController , NavController, NavParams } from 'ionic-angular';
import { PlaceModalPage } from '../place-detail/place-modal';

/**
 * Generated class for the TestePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-teste',
  templateUrl: 'teste.html',
})
export class TestePage {

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
  }
  open() {
    let modal = this.modalCtrl.create(PlaceModalPage);
    modal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestePage');
  }

}
