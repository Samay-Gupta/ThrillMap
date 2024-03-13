import { Schema } from "mongoose";
import { Profile } from "thrill-map-models";

const ProfileSchema = new Schema<Profile>(
    { 
        firstName: { 
            type: String 
        }, 
        lastName: { 
            type: String 
        },
        email: { 
            type: String 
        },
        profileImageURL: { 
            type: String
        },
        orders: {
            type: [String]
        },
        preferences: {
            type: Object
        }
    },
  { collection: "Profile" }
);

export default ProfileSchema;
