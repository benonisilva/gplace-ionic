import { Component } from '@angular/core';
import { Platform, MenuController, App } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TestePage } from '../pages/teste/teste';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TestePage;

  constructor(menu: MenuController, app: App) {
    menu.enable(true);
  }
}

