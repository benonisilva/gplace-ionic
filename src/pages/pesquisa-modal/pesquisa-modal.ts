import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
//import { Keyboard } from '@ionic-native/keyboard';
import { TYPES_SEARCH }  from '../../config/types'

declare var google: any;

@Component({
  selector   : 'page-pesquisa-modal',
  templateUrl: 'pesquisa-modal.html',
})
export class PesquisaModalPage {


  constructor(public viewCtrl: ViewController,
              private params: NavParams,
              //private keyboard: Keyboard
            ) {
  }
  search: any;
  acService: any;
  location: any;
  isGenerica: boolean = true;
  types: any [] = TYPES_SEARCH;
  endereco: string;

  ngOnInit() {
    this.search = {
      query: '',
      type: null,
      isGeneric: true,
      radius:  50
    };
  }
  updateItem(check) {
      this.isGenerica = check;
      this.search.query = '';
      this.search.isGeneric = check;
      this.search.type = null;
      this.types = TYPES_SEARCH;
  }


  getSearchTerm(ev: any) {
      this.types = TYPES_SEARCH;
      let val = ev.target.value;
      if (val && val.trim() != '') {
        this.types = this.types.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  enviar(search: any) {
    this.viewCtrl.dismiss(search);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      //this.keyboard.show();
      this.search.location =  this.params.get('location');
      this.endereco = this.params.get('endereco');
    }, 400);
  }
}
