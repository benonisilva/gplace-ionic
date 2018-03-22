
import {Component, ElementRef, HostListener, NgZone, ViewChild} from '@angular/core';
import {ModalController, NavController, Modal} from 'ionic-angular';
import {AgmMap} from '@agm/core';

import { MAP_STYLE } from '../../config/config';
import { AutocompleteModalPage } from '../autocomplete-modal/autocomplete-modal';
import { PesquisaModalPage } from './../pesquisa-modal/pesquisa-modal';
import { PlaceModalPage } from '../place-detail/place-modal';

declare var google: any;

@Component({
  selector   : 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;
  @ViewChild(AgmMap) private map: any;

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.redrawMap();
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

  public latitude: number;
  public longitude: number;
  public zoom: number;
  // Map Styles array located at config/config.ts, visit https://snazzymaps.com/ for more styles
  styles: any = MAP_STYLE;

  constructor(private ngZone: NgZone,
              private navCtrl: NavController,
              //private mapsAPILoader: MapsAPILoader,
              private storage: Storage,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.storage.keys().then( (res) => this.onSucessKeys(res));
    this.redrawMap();
  }

  onSucessKeys(keys:any[]){
    console.log(keys);
  }

  onSuccessDetailDismiss(place) {
    if(place) {
      this.storage.setItem(place.place_id,place);
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
    });
    modal.onDidDismiss((data)=>{
      this.onSuccessDetailDismiss(data);
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
          keyword : data.query
        };
        service.nearbySearch(search,(res,status, pagination)=>{
            this.ngZone.run(()=>{
                this.itens = res.sort((a,b)=>{return a.rating-b.rating});
                this.loading = false;
                console.log(res);
                console.log(pagination);
                this.pagination = pagination;
            });
        });
      } else {
        let search = {
          location : data.location,
          radius: data.radius,
          type : [data.type.value]
        };
        service.nearbySearch(search,(res,status, pagination)=>{
          this.ngZone.run(()=>{
              this.itens = res.sort((a,b)=>{return a.rating-b.rating});
              this.loading = false;
              console.log(res);
              console.log(pagination);
              this.pagination = pagination;
          });
      });
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
        this.latitude = -7.229075;
        this.longitude = -35.880834;
        this.zoom = 17;
        this.map._mapsWrapper.setCenter({lat: this.latitude, lng: this.longitude});
      });
  }
}
