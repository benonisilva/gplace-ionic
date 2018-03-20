import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AgmCoreModule} from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AutocompleteModalPage} from '../pages/autocomplete-modal/autocomplete-modal';
import {Keyboard} from '@ionic-native/keyboard';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { PesquisaModalPage } from '../pages/pesquisa-modal/pesquisa-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutocompleteModalPage,
    PesquisaModalPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey   : 'AIzaSyBw7YkFGWVgVvD-sLZylpjRrcpFuQYS1Bk',
      libraries: ['places']
    }),
    PrettyJsonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutocompleteModalPage,
    PesquisaModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
