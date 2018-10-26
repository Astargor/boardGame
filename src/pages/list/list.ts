import { Component,Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  imagen:string;
  numeroEvento:number;
  eventos:Array<{images:string,numero:number}>;
  icons: string[];
  warmth:number;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');    
    this.numeroEvento = 0;
    this.eventos = [{images:"sleep",numero:1},{images:"viking",numero:2},{images:"box",numero:3},{images:"viking",numero:4},{images:"axe",numero:5}];
    this.imagen =  this.eventos[this.numeroEvento].images;
    this.warmth = 0;
  
  }

  cambiaEvento(){

    if(this.numeroEvento != 5){

      if(this.numeroEvento == 0){

        this.numeroEvento = this.numeroEvento + 1;
      }

      this.imagen = this.eventos[this.numeroEvento].images;

       this.numeroEvento = this.numeroEvento + 1;

   

    }else{

      this.numeroEvento = 0;

      this.imagen = this.eventos[this.numeroEvento].images;

    }

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
