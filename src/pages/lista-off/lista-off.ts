import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { CsvUtils } from '../../app/services/csv-utils';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ListaOffPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-lista-off',
  templateUrl: 'lista-off.html',
  providers: [CsvUtils]
})
export class ListaOffPage {

  constructor(
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private csvUltils: CsvUtils,
    private storage: Storage,
    public navParams: NavParams) {
  }
  headers:any;
  itens: any [] = [];

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Limpar Locais Salvos',
      message: `Confirma Limpar?`,
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
            this.storage.clear();
            this.viewCtrl.dismiss({limpar:true});
          }
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  limpar() {
    console.log("limpar");
    this.presentConfirm();
  }

  exportCsv(itens) {
    let itemsFormatted:any[] = [];
    itens.forEach(element => {
      itemsFormatted.push(
        {
          name : element.name.replace(/,/g, ' '),
          rating: element.rating ? element.rating : "NA",
          website: element.website ? element.website: "NA",
          formatted_address: element.formatted_address
             ? element.formatted_address.replace(/,/g, ' ') : "NA",
          formatted_phone_number: element.formatted_phone_number
             ? element.formatted_phone_number.replace(/,/g, '') : "NA"
        }
      );
    });
    this.csvUltils.exportCSVFile(this.headers, itemsFormatted, "planilha_pesquisa");
  }

  ionViewDidLoad() {
    this.itens =  this.navParams.get('places');
    this.headers = {
      name: "Nome",
      rating:"Avaliação",
      website :"Site",
      formatted_address : "Endereço",
      formatted_phone_number:"Telefone"
    };
  }

}
