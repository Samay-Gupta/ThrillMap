import { Request, Response } from "express";

import ThrillMapDatabase from "../database";

export class RideView {
    static async getRides(req: Request, res: Response) {
        const filters: { [key: string]: string } = {};
        if (req.query.category) {
            filters["category"] = req.query.category.toString();
        }
        if (req.query.name) {
            filters["name"] = req.query.name.toString();
        }
        ThrillMapDatabase.getRides(filters).then((rideList) => {
            res.send(rideList);
        });
    }
}
