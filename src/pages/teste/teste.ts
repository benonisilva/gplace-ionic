import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-teste',
  templateUrl: 'teste.html',
})
export class TestePage {
  rootPage = HomePage;
  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestePage');
  }

}
