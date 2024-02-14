import { Request, Response } from "express";

import ThrillMapDatabase from "../database";
import { Profile } from "models/Profile";
import { Account } from "models/Account";

export class ProfileView {
    static async getProfile(req: Request, res: Response) {
        const filters = {
            'authKey': req.query.authKey
        };
        ThrillMapDatabase.getProfile(filters).then((profile) => {   
            if (profile) {
                res.send(profile);
            }
        });
    }

    static async editProfile(req: Request, res: Response) {
        const filters = {
            'authKey': req.query.authKey
        };
        const profile = req.body as Profile;
        ThrillMapDatabase.editProfile(filters, profile).then(() => {
            res.status(200).send();
        });
    }

    static async login(req: Request, res: Response) {
        const credentials = {
            'email': req.body.email,
            'password': req.body.password
        } as Partial<Account>;
        ThrillMapDatabase.loginToAccount(credentials).then((authKey) => {
            console.log(authKey);
            if (authKey) {
                res.send(authKey);
            }
        });
    }
}