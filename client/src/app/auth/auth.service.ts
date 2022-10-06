import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authentification } from '../../../../common/authentification';
import { UserConnection } from '../../../../common/userConnection';

/*
* Service pour la gestion de l'authentification
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }
  
  //Contient les informations de l'utilisateur actif
  public userConnectionSubject: BehaviorSubject<UserConnection | null> = new BehaviorSubject<UserConnection | null>(null);
  
  //Permet à l'utilisateur de se connecter
  login(auth: Authentification): Observable<UserConnection>{
    return this._httpClient.post<UserConnection>(`${environment.apiBaseUrl}/auth/login`,auth)
    //On envoie l'utilisateur à tous les
    //aboonées du sujet user
    .pipe(tap(user => {
      this.userConnectionSubject.next(user)
      //On dirige l'utilisateur vers /weather
      this._router.navigate(['weather', 'now'])
    }));
  }
  
  //Permet à l'utilisateur de créer un compte
  signup(auth: Authentification): Observable<UserConnection>{
    return this._httpClient.post<UserConnection>(`${environment.apiBaseUrl}/auth/signup`,auth)
    //On envoie l'utilisateur à tous les
    //aboonées du sujet user
    .pipe(tap(user => {
      this.userConnectionSubject.next(user)
      //On dirige l'utilisateur vers /weather
      this._router.navigate(['weather','now'])
    }));
  }
  
  //Permet à l'utilisateur de se déconnecter
  logout():void{
    this.userConnectionSubject.next(null);
    this._router.navigate(['auth']);
  }
}
