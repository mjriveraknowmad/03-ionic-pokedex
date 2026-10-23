import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, LoadingController, IonGrid, IonRow, IonCol, IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular';
import { Pokemon } from '../../services/pokemon';
import { IPokemon } from '../models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, IonGrid, IonRow, IonCol, IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class ListPokemonsPage {
  private pokemonSvc = inject(Pokemon);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);
  pokemons = this.pokemonSvc.pokemons;

  ionViewWillEnter() {
    this.morePokemons();
  }

  async morePokemons(event?:any) {
    console.log('Loading more pokemons...');
    let loading: HTMLIonLoadingElement | null = null;
    if(!event){
      loading = await this.loadingCtrl.create({ message: 'Cargando...' });
      loading.present();
    }
    await this.pokemonSvc.getPokemons();
    event?.target.complete();
    if(loading){
      loading.dismiss();
    }
  }

  goToDetail(pokemon: IPokemon) {
    this.router.navigate(['/detail-pokemon', pokemon.id]);
  }

}
