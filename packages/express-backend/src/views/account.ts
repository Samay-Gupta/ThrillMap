import { Request, Response } from "express";

import ThrillMapDatabase from "../database";

import { Account } from "models/Account";

export class AccountView {
    static async login(req: Request, res: Response) {
        const credentials = {
            'email': req.body.email,
            'password': req.body.password
        } as Partial<Account>;
        ThrillMapDatabase.loginToAccount(credentials).then((authKey) => {
            if (!authKey) {
                res.status(401).send();
            } else {
                res.send({ authKey: authKey});
            }
        });
    }

    static async signup(req: Request, res: Response) {
        const account = {
            'email': req.body.email,
            'password': req.body.password,
        } as Partial<Account>;
        const profile = {
            'email': req.body.email,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'profileImageURL': '',
            'orders': [],
            'preferences': {}
        };
        
    }
}