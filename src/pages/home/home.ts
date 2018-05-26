import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interfaces';
import { reorderArray } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:any[] = [];
  audio = new Audio();
  audioTiempo:any;
  ordenando:boolean = false;


  constructor(public navCtrl: NavController) {

    this.animales = ANIMALES.slice(0);
    console.log(this.animales);

  }

  reproducir( animal:Animal ){

    this.pausar_audio( animal );

  if( animal.reproduciendo){
    animal.reproduciendo = false;
    return;
  }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000);

  }


  private pausar_audio( animalSel:Animal){
    console.log(this.audioTiempo)
    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime = 0;

      for( let animal of this.animales){

        if(animal.nombre != animalSel.nombre ){
          animal.reproduciendo = false;
        }
      }



  }

  borrarAnimal( idx:number){

    this.animales.splice(idx, 1)

  }

  recargar_animales( refresher:any){

    console.log("inicio del refresh");

    setTimeout(()=>{
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500)

  }

  reordenar_animales( indices:any ){

    this.animales = reorderArray(this.animales, indices);

  }

}
