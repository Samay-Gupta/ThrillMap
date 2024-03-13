import { Schema } from "mongoose";
import { Account } from "thrill-map-models";

const AccountSchema = new Schema<Account>(
    { 
        email: { 
            type: String 
        }, 
        authKey: { 
            type: String 
        },
        password: { 
            type: String
        },
        profileId: {
            type: String
        }
    },
  { collection: "Account" }
);

export default AccountSchema;