import { Component, inject, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonProgressBar,
  IonRow,
  IonText,
  LoadingController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { GetStatPipe } from '../../pipes/get-stat.pipe';
import { Pokemon } from '../../services/pokemon';
import { IPokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonProgressBar,
    GetStatPipe
  ]
})
export class DetailPokemonPage {


  private pokemonService = inject(Pokemon);
  private loadingController: LoadingController = inject(LoadingController);
  private router: Router = inject(Router)

  // ID que viene de la url
  @Input() id!: number;

  // Pokemon a mostrar
  public pokemon = signal<IPokemon | null>(null);
  public pokemonStats: any[] = [
    {
      name: 'PS',
      stat: 'hp'
    },
    {
      name: 'Ataque',
      stat: 'attack'
    },
    {
      name: 'Defensa',
      stat: 'defense'
    },
    {
      name: 'At. esp.',
      stat: 'special-attack'
    },
    {
      name: 'Def. esp.',
      stat: 'special-defense'
    },
    {
      name: 'Velocidad',
      stat: 'speed'
    }
  ]

  constructor() {
    addIcons({
      closeOutline
    })
  }

  async ionViewWillEnter() {
    console.log(this.id);

    // Mostramos mensaje de carga
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    loading.present();

    // Obtenemos el pokemon
    this.pokemonService.getPokemon(this.id).then((pokemon: IPokemon) => {
      this.pokemon.set(pokemon);
    }).catch((error) => {
      // En caso de fallo, vuelve atras
      this.goBack();
    }).finally(() => {
      loading.dismiss()
    })
  }

  /**
   * Vuelve a list-pokemon
   */
  goBack() {
    this.router.navigateByUrl('list-pokemons')
  }

}
