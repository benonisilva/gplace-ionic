import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { TYPES_SEARCH }  from '../../config/types'

declare var google: any;

@Component({
  selector   : 'page-pesquisa-modal',
  templateUrl: 'pesquisa-modal.html',
})
export class PesquisaModalPage {


  constructor(public viewCtrl: ViewController,
              private params: NavParams, 
              private keyboard: Keyboard) {
  }
  search: any;
  acService: any;
  location: any;
  isGenerica: boolean;
  types: any [] = TYPES_SEARCH;

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
    this.search = {
      query: ''
    };
  }
  updateItem(check) {
      this.isGenerica = check;
      this.search.query = '';
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

  ionViewDidLoad() {
    setTimeout(() => {
      this.keyboard.show();
      this.location =  this.params.get('location');
    }, 400);
  }
}
