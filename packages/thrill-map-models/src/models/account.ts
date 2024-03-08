import { ObjectId } from "mongoose";

export interface Account {
    email: string;
    authKey: string;
    password: string;
    profileId: ObjectId;
}