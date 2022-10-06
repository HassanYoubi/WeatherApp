import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserConnection } from '../../../../common/userConnection';
import { WttrObject } from '../../../../common/weather';
import { AuthService } from '../auth/auth.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.css']
})
export class WeatherNowComponent implements OnInit, OnDestroy {

  //déclarations des attributs
  public wttrObjects: WttrObject[] = [];
  public subscriptionWeather: any;
  public subscriptionUser: any;
  public user: UserConnection | null = { id: 0, token: '', username: '' };

  constructor(private weatherService: WeatherService, private _authService: AuthService) { }

  ngOnInit(): void {
    //abonnement au weatherSubject pour obtenir les dernières informations de météo  
    this.subscriptionWeather = this.weatherService.weatherSubject.subscribe({
      next: value => this.wttrObjects = value,
      error: err => console.error("Erreur lancée:" + err),
      complete: () => console.log("Observation complétée")
    });
    //abonnement au userConnectionSubject pour obtenir les informations du user
    this.subscriptionUser = this._authService.userConnectionSubject.subscribe({
      next: value => this.user = value
    });
  }

  ngOnDestroy(): void {
    //désabonnemment du weatherSubject et userConnectionSubject
    this.subscriptionWeather.unsubscribe();
    this.subscriptionUser.unsubscribe();

  }
}
