import {AngularFireDatabase} from 'angularfire2/database';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage
  ],
  providers: [ AngularFireAuth, AngularFireDatabase ],
})
export class LoginPageModule { }
