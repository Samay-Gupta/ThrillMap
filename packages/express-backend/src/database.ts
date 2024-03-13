import mongoose, { Model, ObjectId } from "mongoose";

import RideSchema from "./schemas/RideSchema";
import RestaurantSchema from "./schemas/RestaurantSchema";
import EventSchema from "./schemas/EventSchema";
import ProfileSchema from "./schemas/ProfileSchema";
import AccountSchema from "./schemas/AccountSchema";
import OrderSchema from "./schemas/OrderSchema";

import { Ride, Restaurant, Event, Profile, Account, Order } from "thrill-map-models";

import 'dotenv/config'

interface ModelsList {
    Ride: Model<Ride>;
    Restaurant: Model<Restaurant>;
    Event: Model<Event>;
    Profile: Model<Profile>;
    Account: Model<Account>;
    Order: Model<Order>;
}


const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB } = process.env;

class ThrillMapDatabase {
    private static dbConnection: mongoose.Connection = mongoose.createConnection();

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

    private static async createConnection() {
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

    static async getRides(filter: any = {}): Promise<Ride[]> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const rideList = models.Ride.find(filter);
        return rideList;
    }

    static async getRestaurants(filter: any = {}): Promise<Restaurant[]> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const restaurantList = models.Restaurant.find(filter);
        return restaurantList;
    }

    static async getEvents(filter: any = {}): Promise<Event[]> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const eventList = models.Event.find(filter);
        return eventList;
    }

    static async editProfile(filter: any = {}, profile: Partial<Profile>): Promise<Profile | null> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const profileId = await this.getProfileIdFromAuthKey(filter.authKey);
        let profileInfo = null
        if (profileId) {
            await models.Profile.updateOne({_id: profileId}, { $set: profile });
        }
        return profileInfo;
    }

    static async getProfile(filter: any = {}): Promise<Profile | undefined> {
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

    }

    static async getProfileIdFromAuthKey(authKey: string): Promise<ObjectId | undefined> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const account = await models.Account.findOne({authKey: authKey});
        if (account) {
            return account.profileId;
        }
    }

    static async createOrder(authKey: string, order: Order): Promise<any> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const userProfile = await this.getProfile({authKey: authKey});
        if (!userProfile) {
            return undefined;
        }
        const restaurantList = await this.getRestaurants({restaurantId: order.restaurantId});
        if (restaurantList.length !== 1) {
            return undefined;
        } 
        const newOrder = new models.Order(order);
        await newOrder.save();
        await models.Profile.updateOne({_id: (userProfile as any)._id}, { $push: { orders: newOrder._id.toString() } });    
        newOrder.orderId = newOrder._id.toString();
        return newOrder;
    }

    static async getOrder(orderId: string): Promise<Order | undefined> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const order = await models.Order.findOne({_id: orderId});
        if (order) {
            order.orderId = orderId;
            return order;
        }
    }

    static async loginToAccount(credentials: Partial<Account>): Promise<string | undefined> {
        const conn = await this.getConnection();
        const models = this.getModels(conn);
        const accountList = await models.Account.find(credentials);
        if (accountList.length === 1) {
            return accountList[0].authKey;
        }
    }
}

export default ThrillMapDatabase;