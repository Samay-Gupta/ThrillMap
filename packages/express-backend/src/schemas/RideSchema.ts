import { Schema } from "mongoose";
import { Ride } from "thrill-map-models";

const RideSchema = new Schema<Ride>(
    { 
        name: { 
            type: String 
        }, 
        description: { 
            type: String 
        }, 
        minHeight: { 
            type: Number
        }, 
        duration: { 
            type: Number
        }, 
        imageURL: { 
            type: String
        },
        category: {
            type: String
        }
    },
  { collection: "Ride" }
);

export default RideSchema;