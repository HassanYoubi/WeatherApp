export interface WeatherProvider {
  //Retourne la météo d'une position (location)
  readWeather(location: string): Promise<JSON>;
  readWeathers(location: string[]): Promise<JSON[]>;
}

//Interface User pour le serveur et la BD
export interface User{
    //Mot de passe chiffré de l'utilisateur
    hash: string
    //Username de l'utilisateur
    username: string,
}


//Permet d'ajouter des champs à la requête de express
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      locations: Array<string>,
      userId: string
    }
  }
}

