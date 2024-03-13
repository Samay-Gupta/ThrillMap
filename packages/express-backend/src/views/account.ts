import { Account, LoginForm, SignUpForm } from "thrill-map-models";
import { Request, Response } from "express";

import ThrillMapDatabase from "../database";

export class AccountView {
    static async login(req: Request, res: Response) {
        const loginForm = req.body as LoginForm;
        const credentials = {
            'email': loginForm.email,
            'password': loginForm.password
        } as Partial<Account>;
        ThrillMapDatabase.loginToAccount(credentials).then((authKey) => {
            if (authKey === null) {
                res.status(401).send();
            } else {
                res.send({ authKey: authKey});
            }
        });
    }

    static async signup(req: Request, res: Response) {
        const signUpForm = req.body as SignUpForm;
        const account = {
            'email': signUpForm.email,
            'password': signUpForm.password,
        } as Partial<Account>;
        const profile = {
            'email': signUpForm.email,
            'firstName': signUpForm.firstName,
            'lastName': signUpForm.lastName,
            'profileImageURL': '',
            'orders': [],
            'preferences': {}
        };
        ThrillMapDatabase.createAccount(account, profile).then((authKey) => {
            if (authKey === null) {
                res.status(401).send();
            } else {
                res.send({ authKey: authKey});
            }
        });
    }
}
