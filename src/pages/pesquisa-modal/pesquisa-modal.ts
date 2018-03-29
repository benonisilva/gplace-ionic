import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
import { TYPES_SEARCH }  from '../../config/types'
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Component({
  selector   : 'page-pesquisa-modal',
  templateUrl: 'pesquisa-modal.html',
})
export class PesquisaModalPage {

  atividades:any[] = [];
  atividadesCache: any[] = [];
  constructor(public viewCtrl: ViewController,
              private params: NavParams,
              afDB: AngularFireDatabase,
              //private keyboard: Keyboard
            ) {
      afDB.list('atividades').valueChanges().subscribe((res)=>{
        this.atividades = res;
      });
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
      radius:  50000,
      customType: null
    };
  }
  updateItem(check) {
      this.isGenerica = check;
      this.search.query = '';
      this.search.isGeneric = check;
      this.search.type = null;
      this.search.customType = null;
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
  getSearchGeneric(ev: any) {
    this.atividadesCache = [...this.atividades];
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.atividadesCache = this.atividadesCache.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  enviar(search: any) {
    search.query = search.customType;
    console.log(search);
    this.viewCtrl.dismiss(search);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.search.location =  this.params.get('location');
      this.endereco = this.params.get('endereco');
    }, 400);
  }
}
