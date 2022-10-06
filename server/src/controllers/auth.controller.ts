import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Authentification } from '../../../common/authentification';
import { UserConnection } from '../../../common/userConnection';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MongodbService } from '../services/mongodb.service';
import { TYPES } from '../types';


@injectable()
export class AuthController {
    public constructor(@inject(TYPES.AuthService) private _authService: AuthService,
        @inject(TYPES.MongodbService) private _mongodbService: MongodbService) {
        //empty
    }

    public get router(): Router {

        const router: Router = Router();

        // -> /api/v1/auth/login
        router.post('/login', async (req: Request, res: Response) => {

            const auth: Authentification = req.body;
            //Trouver l'utilisateur dans la BD,
            const user = await this._mongodbService.getUserByUsername(auth.username);
            if (user == null) {
                res.status(403).send();
            } else {
                //Comparer le mot de passe de la BD avec le mot de passe de la requête, 
                const isPasswordValid = await this._authService.isPasswordValid(auth.password, user.hash);
                if (!isPasswordValid) {
                    res.status(403).send();
                } else {
                    //Générer le jeton de l'utilisateur
                    const _token = this._authService.generateToken(user._id.toString());
                    const userconnection: UserConnection = { id: user._id, token: _token, username: user.username };
                    //Retourner les informations de connexion de l'utilisateur  
                    res.json(userconnection);
                }
            }
        });

        // -> /api/v1/auth/signup
        router.post('/signup', async (req: Request, res: Response) => {

            const auth: Authentification = req.body;
            //Valider que l'utilisateur  n'est pas déjà dans la BD
            const userBd = await this._mongodbService.getUserByUsername(auth.username);
            if (userBd != null) {
                res.status(405).send();
            } else {
                //Chiffrer le mot de passe avec auth.service
                const passwordHash = await this._authService.encryptPassword(auth.password);
                const user: User = { hash: passwordHash, username: auth.username };
                // Ajouter l'utilisateur à la BD
                const newUser = await this._mongodbService.createUser(user);

                //Générer le jeton de l'utilisateur
                if (newUser != null) {
                    const _token = this._authService.generateToken(newUser._id.toString());
                    const userconnection: UserConnection = { id: newUser._id.toString(), token: _token, username: newUser.username };
                    // Retourner les informations de connexion de l'utilisateur  
                    res.json(userconnection);

                } else {
                    // en cas d'erreur
                    res.status(500).send();
                }

            }
        });

        return router;
    }

}