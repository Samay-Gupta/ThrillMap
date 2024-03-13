import { Schema } from "mongoose";
import { Event } from "thrill-map-models";

const EventSchema = new Schema<Event>(
    { 
        name: { 
            type: String 
        }, 
        description: { 
            type: String 
        }, 
        date: { 
            type: String
        }, 
        location: { 
            type: String
        },
        imageURL: { 
            type: String
        }
    },
  { collection: "Event" }
);

export default EventSchema;
