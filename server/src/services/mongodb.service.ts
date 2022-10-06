import { injectable } from 'inversify';
import { Collection, MongoClient, WithId } from 'mongodb';
import { User } from '../interfaces';

const url = 'mongodb://127.0.0.1:27017';

@injectable()
/*
* Cette classe s'occupe des communications avec MongoDB
*/
export class MongodbService {

    private _client: MongoClient = new MongoClient(url);
    private _collection: Collection<User>;

    constructor() {
        this._client.connect();
        //Collection à utiliser
        this._collection = this._client.db('tp2').collection<User>('users');
    }

    //Retourne les informations d'un utilisateur à partir de son username
    async getUserByUsername(_username: string): Promise<WithId<User> | null> {

        //Trouver et Retourner  l'utilisateur à partir de la BD
        return this._collection.findOne({ username: _username });

    }
    //Fait la création d'un utilisateur dans la base de données
    async createUser(user: User): Promise<WithId<User> | null> {

        //Création un utilisateur dans la BD
        await this._collection.insertOne(user);

        //Retourner l'utilisateur créé avec son _id
        return this.getUserByUsername(user.username);
    }

}