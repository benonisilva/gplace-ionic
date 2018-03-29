import {AngularFireDatabase} from 'angularfire2/database';
import { Component } from '@angular/core';
import {ViewController, NavController,   ToastController,  IonicPage, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


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
    password: 'SenhA!123'
  };

  items: Observable<any[]>;
  atividades: any[] = [];
  atividadesCache: any[] = [];
  atividade:string;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    ) {
      afDB.list('atividades', (ref)=> ref.orderByValue() ).snapshotChanges().subscribe(res=>{
          this.atividadesCache = [];
          this.atividades = [];
          res.forEach((c)=>{
                this.atividadesCache.push(
                  {key: c.payload.key, name: c.payload.val() }
                );
          });
          this.atividades = this.atividadesCache;
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.atividade = val;
    this.atividades =
        this.atividadesCache.filter((it)=>{
          return it.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
  }
  addItem() {
      console.log(this.atividade);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Nova Adividade',
      message: `Confirma adicionar ${this.atividade} ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Buy clicked');
            this.afDB.list(`atividades`).push(this.atividade);
          }
        }
      ]
    });
    alert.present();
  }

  deleteItem(key:any) {
      console.log(key);
      this.afDB.list(`atividades`).remove(key).then((res)=>{
          console.log(res);
      });
  }

  // Attempt to login in through our User service
  doLogin() {

    this.afAuth.auth
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
