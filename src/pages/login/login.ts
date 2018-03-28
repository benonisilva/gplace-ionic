import { Component } from '@angular/core';
import {   NavController,  ToastController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'benoni.silva@gmail.com',
    password: 'Aflor151'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private authS: AngularFireAuth,
    ) {
  }

  dismiss() {

  }

  // Attempt to login in through our User service
  doLogin() {

    this.authS.auth
      .signInWithEmailAndPassword(this.account.email, this.account.password).then((resp) => {
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
