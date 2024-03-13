import { OrderForm } from "thrill-map-models";
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
        const authKey = req.headers.authorization ?? "";
        const orderForm = req.body as OrderForm;
        const newOrder = {
            restaurantId: orderForm.restaurantId,
            desc: orderForm.desc,
            items: orderForm.items,
            total: orderForm.total,
            status: orderForm.status
        }
        ThrillMapDatabase.createOrder(authKey, newOrder).then((order) => {
            res.send(order);
        });
    }

    static async getOrder(req: Request, res: Response) {
        const orderId = req.query.orderId? req.query.orderId.toString() : "";
        ThrillMapDatabase.getOrder(orderId).then((order) => {
            res.send([order]);
        });
    }
}
