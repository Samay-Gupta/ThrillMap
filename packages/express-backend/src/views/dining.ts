import { Request, Response } from "express";

import ThrillMapDatabase from "../database";

export class DiningView {
    static async getRestaurants(req: Request, res: Response) {
        const filters: { [key: string]: string } = {};
            if (req.query.category) {
                filters["category"] = req.query.category.toString();
            }
            if (req.query.name) {
                filters["name"] = req.query.name.toString();
            }
            ThrillMapDatabase.getRestaurants(filters).then((restaurantList) => {
                res.send(restaurantList);
            });
    }

    static async createOrder(req: Request, res: Response) {
        const authKey = req.query.authKey? req.query.authKey.toString() : "";
        ThrillMapDatabase.createOrder(authKey, req.body).then((order) => {
            res.send(order);
        });
    }

    static async getOrder(req: Request, res: Response) {
        const orderId = req.query.orderId? req.query.orderId.toString() : "";
        ThrillMapDatabase.getOrder(orderId).then((order) => {
            res.send(order);
        });
    }
}