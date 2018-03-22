import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { StatusBar } from '@ionic-native/status-bar';
import {AgmCoreModule} from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AutocompleteModalPage } from '../pages/autocomplete-modal/autocomplete-modal';
import { PesquisaModalPage } from '../pages/pesquisa-modal/pesquisa-modal';
import { PlaceModalPage } from '../pages/place-detail/place-modal';
import { TestePage } from '../pages/teste/teste';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutocompleteModalPage,
    PesquisaModalPage,
    PlaceModalPage,

    TestePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey   : 'AIzaSyBw7YkFGWVgVvD-sLZylpjRrcpFuQYS1Bk',
      libraries: ['places']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutocompleteModalPage,
    PesquisaModalPage,
    PlaceModalPage,

    TestePage
  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    // Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
