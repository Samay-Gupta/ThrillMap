import mongoose, { Model } from "mongoose";

import RideSchema from "./schemas/RideSchema";
import RestaurantSchema from "./schemas/RestaurantSchema";
import EventSchema from "./schemas/EventSchema";
import ProfileSchema from "./schemas/ProfileSchema";
import AccountSchema from "./schemas/AccountSchema";
import OrderSchema from "./schemas/OrderSchema";

import { Ride, Restaurant, Event, Profile, Account, Order } from "thrill-map-models";

import 'dotenv/config';

interface ModelsList {
    Ride: Model<Ride>;
    Restaurant: Model<Restaurant>;
    Event: Model<Event>;
    Profile: Model<Profile>;
    Account: Model<Account>;
    Order: Model<Order>;
}

class ThrillMapDatabase {
    private static dbConnection: mongoose.Connection = mongoose.createConnection();

    private static async createConnection() {
        const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB } = process.env;
        const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`;
        const conn = mongoose.createConnection(uri);
        await conn.asPromise();
        return conn;
    }

    private static async getConnection() {
        if (this.dbConnection.readyState === 0) {
            this.dbConnection = await this.createConnection();
        }
        return this.dbConnection;
    }

    private static getModels(conn: mongoose.Connection): 
            ModelsList {
        return {
            Ride: conn.model('Ride', RideSchema),
            Restaurant: conn.model('Restaurant', RestaurantSchema),
            Event: conn.model('Event', EventSchema),
            Profile: conn.model('Profile', ProfileSchema),
            Account: conn.model('Account', AccountSchema),
            Order: conn.model('Order', OrderSchema)
        };
    }

    static async loginToAccount(credentials: Partial<Account>): Promise<string | null> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const accountList = await models.Account.find(credentials);
        console.log(accountList);
        if (accountList.length === 1) {
            return accountList[0].authKey;
        }
        return null;
    }

    static async createAccount(account: Partial<Account>, profile: Partial<Profile>): Promise<string | null> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const newProfile = new models.Profile(profile);
        await newProfile.save();
        account.profileId = newProfile._id.toString();
        const newAccount = new models.Account(account);
        await newAccount.save();
        return newAccount.authKey;
    }

    static async getProfileIdFromAuthKey(authKey: string): Promise<String | null> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const account = await models.Account.findOne({authKey: authKey});
        if (account) {
            return account.profileId;
        }
        return null;
    }

    static async getProfile(filter: any = {}): Promise<Profile | null> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const profileId = await this.getProfileIdFromAuthKey(filter.authKey);
        const profile = await models.Profile.findOne({_id: profileId});

        if (profile) {
            const orderList = profile.orders.map(async (orderId: string) => {
                return await this.getOrder(orderId);
            }); 
            const orders = await Promise.all(orderList);
            profile.orders = orders.map(order => JSON.stringify(order));
            return profile;
        }
        return null;
    }

    static async editProfile(filter: any = {}, profile: Partial<Profile>) {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const profileId = await this.getProfileIdFromAuthKey(filter.authKey);
        if (profileId) {
            await models.Profile.updateOne({_id: profileId}, { $set: profile });
        }
    }

    static async getRides(filter: any = {}): Promise<Ride[]> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const rideList = await models.Ride.find(filter);
        return rideList;
    }

    static async getRestaurants(filter: any = {}): Promise<Restaurant[]> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const restaurantList = await models.Restaurant.find(filter);
        return restaurantList;
    }

    static async getEvents(filter: any = {}): Promise<Event[]> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const eventList = await models.Event.find(filter);
        return eventList;
    }

    static async createOrder(authKey: string, order: Partial<Order>): Promise<Order | null> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const userProfile = await this.getProfile({authKey: authKey});
        if (!userProfile) {
            return null;
        }
        const restaurantList = await this.getRestaurants({restaurantId: order.restaurantId});
        if (restaurantList.length !== 1) {
            return null;
        } 
        const newOrder = new models.Order(order);
        if (!await newOrder.save()) {
            return null;
        }
        await models.Profile.updateOne({_id: (userProfile as any)._id}, { $push: { orders: newOrder._id.toString() } });    
        newOrder.orderId = newOrder._id.toString();
        await newOrder.save();
        return newOrder;
    }

    static async getOrder(orderId: string): Promise<Order | null> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const order = await models.Order.findOne({_id: orderId});
        if (order) {
            order.orderId = orderId;
            return order;
        }
        return null;
    }
}

export default ThrillMapDatabase;
