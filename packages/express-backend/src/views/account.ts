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
}