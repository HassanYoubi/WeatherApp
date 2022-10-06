//Type représentant la connexion d'un utilisateur
//Contient les informations pouvant être utiles pour le client
export interface UserConnection{
    //Identifiant unique de l'utilisateur
    id: any,
    //Jeton d'authentification de l'utilisateur
    token: string
    //Username de l'utilisateur
    username: string,
}