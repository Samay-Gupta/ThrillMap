import mongoose, { Model, ObjectId } from "mongoose";

import RideSchema from "./schemas/RideSchema";
import RestaurantSchema from "./schemas/RestaurantSchema";
import EventSchema from "./schemas/EventSchema";
import ProfileSchema from "./schemas/ProfileSchema";
import AccountSchema from "./schemas/AccountSchema";

import { Ride } from "./models/Ride";
import { Restaurant } from "./models/Restaurqant";
import { Event } from "./models/Event";
import { Profile } from "./models/Profile";
import { Account } from "./models/Account";

import 'dotenv/config'
import { Order } from "models/Order";
import OrderSchema from "./schemas/OrderSchema";

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB } = process.env;

class ThrillMapDatabase {
    private static dbConnection: mongoose.Connection = ThrillMapDatabase.getConnection();

    static models: Record<string, Model<any>> = {};

    private static getConnection() {
        if (ThrillMapDatabase.dbConnection) {
            return ThrillMapDatabase.dbConnection;
        }
        ThrillMapDatabase.connect(
            MONGODB_USERNAME, 
            MONGODB_PASSWORD, 
            MONGODB_HOST, 
            MONGODB_DB
        );
        return ThrillMapDatabase.dbConnection;
    }

    private static async connect(
            username: string | undefined, 
            password: string | undefined, 
            host: string | undefined, 
            db: string | undefined) {
        if (ThrillMapDatabase.dbConnection) {
            return ThrillMapDatabase.dbConnection;
        }
        const uri = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;
        ThrillMapDatabase.dbConnection = mongoose.createConnection(uri);
        await ThrillMapDatabase.dbConnection.asPromise();
        ThrillMapDatabase.models = {
            Ride: ThrillMapDatabase.dbConnection.model("Ride", RideSchema),
            Restaurant: ThrillMapDatabase.dbConnection.model("Restaurant", RestaurantSchema),
            Event: ThrillMapDatabase.dbConnection.model("Event", EventSchema),
            Profile: ThrillMapDatabase.dbConnection.model("Profile", ProfileSchema),
            Account: ThrillMapDatabase.dbConnection.model("Account", AccountSchema),
            Order: ThrillMapDatabase.dbConnection.model("Order", OrderSchema)
        };
        return ThrillMapDatabase.dbConnection;
    }

    static async getRides(filter: any = {}): Promise<Ride[]> {
        const rideList = await ThrillMapDatabase.models.Ride.find(filter);
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