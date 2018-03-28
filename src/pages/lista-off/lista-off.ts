import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';
import { CsvUtils } from '../../app/services/csv-utils';

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
    private csvUltils: CsvUtils,
    public navParams: NavParams) {
  }
  headers:any;
  itens: any [] = [];

  dismiss() {
    this.viewCtrl.dismiss();
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
