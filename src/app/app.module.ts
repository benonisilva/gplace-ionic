import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { StatusBar } from '@ionic-native/status-bar';
import {AgmCoreModule} from '@agm/core';

export const firebaseConfig = {
  apiKey: "AIzaSyBkvxJttqve12MAVNC_Cw2SmRHeeT6-ZTZ",
  authDomain: "first-project-7edf6.firebaseapp.com",
  databaseURL: "https://first-project-7edf6.firebaseio.com",
  projectId: "first-project-7edf6",
};

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AutocompleteModalPage } from '../pages/autocomplete-modal/autocomplete-modal';
import { PesquisaModalPage } from '../pages/pesquisa-modal/pesquisa-modal';
import { PlaceModalPage } from '../pages/place-detail/place-modal';
import { TestePage } from '../pages/teste/teste';
import { ListaOffPage } from '../pages/lista-off/lista-off';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutocompleteModalPage,
    PesquisaModalPage,
    PlaceModalPage,
    ListaOffPage,
    TestePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey   : 'AIzaSyBwKyVZGez75F-YigOS6z304TVYgKW19xZ',
      libraries: ['places']
    }),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutocompleteModalPage,
    PesquisaModalPage,
    PlaceModalPage,
    ListaOffPage,
    TestePage,
    LoginPage
  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    // Keyboard,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
