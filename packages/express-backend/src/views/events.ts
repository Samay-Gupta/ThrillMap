import { Request, Response } from "express";

import ThrillMapDatabase from "../database";

export class EventView {
    static async getEvents(req: Request, res: Response) {
        const filters: { [key: string]: string } = {};
        if (req.query.name) {
            filters["name"] = req.query.name.toString();
        }
        ThrillMapDatabase.getEvents(filters).then((rideList) => {
            res.send(rideList);
        });
    }
}