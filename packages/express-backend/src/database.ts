import mongoose, { Model, ObjectId } from "mongoose";

import RideSchema from "./schemas/RideSchema";
import RestaurantSchema from "./schemas/RestaurantSchema";
import EventSchema from "./schemas/EventSchema";
import ProfileSchema from "./schemas/ProfileSchema";
import AccountSchema from "./schemas/AccountSchema";
import OrderSchema from "./schemas/OrderSchema";

import { Ride } from "./models/Ride";
import { Restaurant } from "./models/Restaurqant";
import { Event } from "./models/Event";
import { Profile } from "./models/Profile";
import { Account } from "./models/Account";

import 'dotenv/config'
import { Order } from "models/Order";


const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB } = process.env;

class ThrillMapDatabase {
    private static dbConnection: mongoose.Connection = mongoose.createConnection();

    private static modelSchema: { [key: string]: mongoose.Schema } = {
        Ride: RideSchema,
        Restaurant: RestaurantSchema,
        Event: EventSchema,
        Profile: ProfileSchema,
        Account: AccountSchema,
        Order: OrderSchema
    };

    static models = {};

    static getModels(conn: mongoose.Connection, modelNames: string[]): 
            { [key: string] : Model<any> } {
        const models: { [key: string] : Model<any> } = {};
        modelNames.forEach(name => {
            models[name] = conn.model(name, this.modelSchema[name]);
        });
        return models;
    }

    static async createConnection() {
        const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`;
        const conn = mongoose.createConnection(uri);
        await conn.asPromise();
        return conn;
    }

    static async getConnection() {
        if (this.dbConnection.readyState === 0) {
            this.dbConnection = await this.createConnection();
        }
        return this.dbConnection;
    }

    static async getRides(filter: any = {}): Promise<Ride[]> {
        const conn = await this.getConnection();
        const models = this.getModels(conn, ['Ride']);
        const rideList = models.Ride.find(filter);
        return rideList;
    }

    static async getRestaurants(filter: any = {}): Promise<Restaurant[]> {
        const restaurantList = ThrillMapDatabase.models.Restaurant.find(filter);
        return restaurantList;
    }

    static async getEvents(filter: any = {}): Promise<Event[]> {
        const eventList = await ThrillMapDatabase.models.Event.find(filter);
        return eventList;
    }

    static async editProfile(filter: any = {}, profile: Partial<Profile>): Promise<Profile | null> {
        const profileId = await this.getProfileIdFromAuthKey(filter.authKey);
        let profileInfo = null
        if (profileId) {
            profileInfo = await ThrillMapDatabase.models.Profile.updateOne({_id: profileId}, { $set: profile });
        }
        return profileInfo
    }

    static async getProfile(filter: any = {}): Promise<Profile | undefined> {
        const profileId = await this.getProfileIdFromAuthKey(filter.authKey);
        const profile = await ThrillMapDatabase.models.Profile.findOne({_id: profileId});

        if (profile) {
            const orderList = profile.orders.map(async (orderId) => {
                return await this.getOrder(orderId);
            }); 
            const orders = await Promise.all(orderList);
            profile.orders = orders.map(order => JSON.stringify(order));
            return profile;
        }

    }

    static async getProfileIdFromAuthKey(authKey: string): Promise<ObjectId | undefined> {
        const account = await ThrillMapDatabase.models.Account.findOne({authKey: authKey});
        if (account) {
            return account.profileId;
        }
    }

    static async createOrder(authKey: string, order: Order): Promise<any> {
        const userProfile = await this.getProfile({authKey: authKey});
        if (!userProfile) {
            return undefined;
        }
        const restaurantList = await ThrillMapDatabase.getRestaurants({restaurantId: order.restaurantId});
        if (restaurantList.length !== 1) {
            return undefined;
        } 
        const newOrder = new ThrillMapDatabase.models.Order(order);
        await newOrder.save();
        await ThrillMapDatabase.models.Profile.updateOne({_id: userProfile._id}, { $push: { orders: newOrder._id.toString() } });    
        newOrder.orderId = newOrder._id.toString();
        return newOrder;
    }

    static async getOrder(orderId: string): Promise<Order | undefined> {
        const order = await ThrillMapDatabase.models.Order.findOne({_id: orderId});
        if (order) {
            order.orderId = orderId;
            return order;
        }
    }

    static async loginToAccount(credentials: Partial<Account>): Promise<string | undefined> {
        const accountList = await ThrillMapDatabase.models.Account.find(credentials);
        if (accountList.length === 1) {
            return accountList[0].authKey;
        }
    }
}

export default ThrillMapDatabase;