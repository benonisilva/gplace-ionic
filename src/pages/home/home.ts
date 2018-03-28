
import {Component, ElementRef, HostListener, NgZone, ViewChild} from '@angular/core';
import { ModalController, NavController, Modal} from 'ionic-angular';
import {AgmMap} from '@agm/core';
import { Storage } from '@ionic/storage';

import { MAP_STYLE } from '../../config/config';
import { AutocompleteModalPage } from '../autocomplete-modal/autocomplete-modal';
import { PesquisaModalPage } from './../pesquisa-modal/pesquisa-modal';
import { PlaceModalPage } from '../place-detail/place-modal';
import { ListaOffPage } from '../lista-off/lista-off';

declare var google: any;

@Component({
  selector   : 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;
  @ViewChild(AgmMap) private map: any;

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.redrawMap();
  }

  admin() {
    alert("Nao implementado");
  }

  address: any = {
    place: '',
    set  : false,
  };
  placedetails: any;
  userAddress;
  addressDetails;
  pagination: any;

  geocoder: any;
  pService: any;
  itens: any[] = [];
  loading: boolean = false;
  countItensSaved: number;
  idsItensSalvos: string[];

  public latitude: number;
  public longitude: number;
  public zoom: number;
  // Map Styles array located at config/config.ts, visit https://snazzymaps.com/ for more styles
  styles: any = MAP_STYLE;

  constructor(private ngZone: NgZone,
              private navCtrl: NavController,
              private storage: Storage,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.storage.length().then((len)=>{
      this.countItensSaved = len;
    });
    this.storage.keys().then((keys)=>{
      this.onSucessKeys(keys);
    });
    this.redrawMap();
  }

  isSaved(placeid) {
    return this.idsItensSalvos.some(id => id === placeid );;
  }

  onSucessKeys(keys:string[]){
    console.log(keys);
    this.idsItensSalvos = keys;
  }

  onSuccessDetailDismiss(place) {
    if(place) {
      this.storage.set(place.place_id,place).then(()=>{
        console.log("Add:Item");
        this.storage.length().then((len)=>{
          this.countItensSaved = len;
        });
      });
    }

  }

  showModal() {
    this.reset();
    let modal = this.modalCtrl.create(AutocompleteModalPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.geocodeAddress(data.place_id);
        this.userAddress = data.description;
        this.addressDetails = data;
        console.log(data);
      }
    });
    modal.present();
  }

  openItem(item:any) {
    var container = document.getElementById('agmmap');
    let service = new google.maps.places.PlacesService(container);
    let modal: Modal;
    var request = {
      placeId: item.place_id
    };
    console.log(request);
    service.getDetails(request, (res)=>{
      modal = this.modalCtrl.create(PlaceModalPage,{place:res});
      modal.present();
      console.log(res);
      modal.onDidDismiss((data)=>{
        this.onSuccessDetailDismiss(data);
      });
    });
  }

  _sortByRating(a:any, b:any) {
      let i = a.rating ? a.rating: 0.0;
      let x = b.rating ? b.rating: 0.0;
      return x-i;
  }

  _onSearchResult(res,status, pagination) {
    this.itens = [];
    this.ngZone.run(()=>{
      res.forEach(element => {
        this.itens.push(element);
      });
      this.itens.sort( (a,b)=> this._sortByRating(a,b));
      this.loading = false;
      //console.log(res);
      //console.log(pagination);
      this.pagination = pagination;
    });
  }

  onSucessDismissPesquisa(data){
    if(data) {
      this.loading = true;
      var container = document.getElementById('agmmap');
      let service = new google.maps.places.PlacesService(container);
      if(data.isGeneric) {
        let search = {
          location : data.location,
          radius: data.radius,
          keyword : data.query,
          rankby: 'prominence',
        };
        service.nearbySearch(search,(res,status, pagination)=>
          this._onSearchResult(res,status, pagination) );
      } else {
        let search = {
          location : data.location,
          radius: data.radius,
          type : [data.type.value],
          rankby: 'prominence',
        };
        service.nearbySearch(search,(res,status, pagination)=>
          this._onSearchResult(res,status, pagination) );
      }

    }
  }

  showPesquisa() {
    if( this.latitude && this.longitude ) {
      let modal = this.modalCtrl.create(PesquisaModalPage, {
         location: { lat: this.latitude, lng: this.longitude} , endereco: this.userAddress
      });
      modal.onDidDismiss((dt)=>{
        this.onSucessDismissPesquisa(dt);
      });
      modal.present();
    }
  }

  private geocodeAddress(place_id: string): void {
    this.geocoder = new google.maps.Geocoder;
    this.geocoder.geocode({'placeId': place_id}, (results, status) => {
      if (status !== 'OK') {
        console.log('Geocoder failed due to: ' + status);
        return;
      }
      this.ngZone.run(() => {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        this.map.zoom = 17;
      });
    });
  }

  listOffLines() {
    let itens:any [] = [];
    this.storage.forEach( (place) => {
      itens.push(place);
    }).then(()=>{
      let modal = this.modalCtrl.create(ListaOffPage, {places:itens});
      modal.present();
    });
  }

  private reset() {
    this.initPlacedetails();
    this.address.place = '';
    this.address.set = false;
  }

  private initPlacedetails() {
    this.placedetails = {
      address   : '',
      lat       : '',
      lng       : '',
      components: {
        route                      : {set: false, short: '', long: ''},
        street_number              : {set: false, short: '', long: ''},
        sublocality_level_1        : {set: false, short: '', long: ''},
        locality                   : {set: false, short: '', long: ''},
        administrative_area_level_2: {set: false, short: '', long: ''},
        administrative_area_level_1: {set: false, short: '', long: ''},
        country                    : {set: false, short: '', long: ''},
        postal_code                : {set: false, short: '', long: ''},
        postal_code_suffix         : {set: false, short: '', long: ''},
      }
    };
  }

  private redrawMap() {
    this.map.triggerResize()
      .then(() => {
        this.latitude = -10.9116037 as number;
        this.longitude = -37.0562398  as number;
        this.zoom = 17;
        this.map._mapsWrapper.setCenter({lat: parseFloat("-10.9116037"), lng: parseFloat("-37.0562398")});
      });
  }
}
