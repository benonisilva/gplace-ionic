import { PesquisaModalPage } from './../pesquisa-modal/pesquisa-modal';
import {Component, ElementRef, HostListener, NgZone, ViewChild} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AgmMap} from '@agm/core';
import {MAP_STYLE} from '../../config/config';
import {AutocompleteModalPage} from '../autocomplete-modal/autocomplete-modal';

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

  geocoder: any;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  // Map Styles array located at config/config.ts, visit https://snazzymaps.com/ for more styles
  styles: any = MAP_STYLE;

  constructor(private ngZone: NgZone,
              private navCtrl: NavController,
              private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.redrawMap();
  }

  showModal() {
    this.reset();
    let modal = this.modalCtrl.create(AutocompleteModalPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.geocodeAddress(data.place_id);
        this.userAddress = data.description;
        this.addressDetails = data;
        console.log(data)
      }
    });
    modal.present();
  }

  showPesquisa() {
    if( this.latitude && this.longitude ) {
      let modal = this.modalCtrl.create(PesquisaModalPage, {
         location: { lat: this.latitude, lng: this.longitude} 
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
