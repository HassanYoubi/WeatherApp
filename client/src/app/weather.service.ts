import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WttrObject } from '../../../common/weather';


/*
* Service pour les opérations en lien avec la météo
*/
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _httpClientModule: HttpClient) {
  }

  //Sujet qui retourne les dernières informations de météo demandées
  //Si aucune informations de météo n'a encore été demandées,
  //va chercher automatiquement les informations de la ville par défaut
  get weatherSubject(): BehaviorSubject<WttrObject[]> {
    if (!this._weatherSubject) {
      this._weatherSubject = new BehaviorSubject<WttrObject[]>([]);
      this.updateWeather(environment.defaultLocation).subscribe({
        error: err => console.error(err)
      });
    }
    return this._weatherSubject;
  }

  //Conserve le sujet utilisé dans le getter
  private _weatherSubject?: BehaviorSubject<WttrObject[]>;

  //Lance une recherche météo pour une série de ville
  //Le résultat est envoyé au weatherSubject
  //locations est un string sous le format: "montreal, paris, laval"
  updateWeather(locations: string): Observable<WttrObject[]> {

    //POUR TESTER
    //return this._httpClientModule.get<WttrObject[]>(`https://wttr.in/montreal?format=j1`).pipe(tap(data => this.weatherSubject.next(data)));
    //On envoie également l'information dans le behaviorSubject
    //un component va pouvoir s'abonner et reçevoir l'information

    return this._httpClientModule.get<WttrObject[]>(`${environment.apiBaseUrl}/weather?locations=${locations}`)
      .pipe(tap(data => this.weatherSubject.next(data)));
  }
}
