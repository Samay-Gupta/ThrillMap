import { Request, Response } from "express";
import { Profile } from "thrill-map-models";

import ThrillMapDatabase from "../database";


export class ProfileView {
    static async getProfile(req: Request, res: Response) {
        const filters = {
            'authKey': req.headers.authorization ?? ""
        };
        ThrillMapDatabase.getProfile(filters).then((profile) => {   
            res.status(200).send(profile);
        });
    }

    static async editProfile(req: Request, res: Response) {
        const filters = {
            'authKey': req.headers.authorization ?? ""
        };
        const profile = req.body as Profile;
        ThrillMapDatabase.editProfile(filters, profile).then((profile) => {
            res.status(200).send(profile);
        });
    }
}
