import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
//import { Keyboard } from '@ionic-native/keyboard';
import { CsvUtils } from '../../app/services/csv-utils';

@Component({
  selector   : 'page-place-modal',
  templateUrl: 'place-modal.html',
  providers: [ CsvUtils ]
})
export class PlaceModalPage {


  constructor(public viewCtrl: ViewController,
              private params: NavParams,
              private csvUltils: CsvUtils,
              //private keyboard: Keyboard
            ) {
  }
  headers: any;
  item: any;
  itemsNotFormatted: any;
  itemsFormatted: any[] =[];

  ngOnInit() {
    this.headers = {
      model: 'Phone Model'.replace(/,/g, ''), // remove commas to avoid errors
      chargers: "Chargers",
      cases: "Cases",
      earphones: "Earphones"
    };
    this.itemsNotFormatted = [
      {
          model: 'Samsung S7',
          chargers: '55',
          cases: '56',
          earphones: '57',
          scratched: '2'
      },
      {
          model: 'Pixel XL',
          chargers: '77',
          cases: '78',
          earphones: '79',
          scratched: '4'
      },
      {
          model: 'iPhone 7',
          chargers: '88',
          cases: '89',
          earphones: '90',
          scratched: '6'
      }
    ];
    this.itemsNotFormatted.forEach((item) => {
      this.itemsFormatted.push({
          model: item.model.replace(/,/g, ' '), // remove commas to avoid errors,
          chargers: item.chargers,
          cases: item.cases,
          earphones: item.earphones
      });
   });

  }

  salvar(item) {
    this.viewCtrl.dismiss(item);
  }
  exportCsv() {
    this.csvUltils.exportCSVFile(this.headers, this.itemsFormatted, "fileTitle");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    setTimeout(() => {
      //this.keyboard.show();
      this.item =  this.params.get('place');
      console.log(this.item);
    }, 100);
  }
}
