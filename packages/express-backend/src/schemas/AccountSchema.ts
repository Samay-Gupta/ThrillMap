import { Schema } from "mongoose";
import { Account } from "models/Account";

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
            type: Schema.Types.ObjectId
        }
    },
  { collection: "Account" }
);

export default AccountSchema;