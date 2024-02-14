import { Schema } from "mongoose";
import { Restaurant, MenuItem } from "models/Restaurant";

const RestaurantSchema = new Schema<Restaurant>(
    { 
        name: { 
            type: String 
        }, 
        description: { 
            type: String 
        }, 
        type: { 
            type: String
        }, 
        imageURL: { 
            type: String
        },
        menu: {
            type: Array<MenuItem>()
        }
    },
  { collection: "Restaurant" }
);

export default RestaurantSchema;