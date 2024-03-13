import { Order } from "thrill-map-models";
import { Schema } from "mongoose";

const OrderSchema = new Schema<Order>({
    orderId: {
        type: String
    },
    restaurantId: { 
        type: String
    },
    desc: {
        type: String
    },
    items: { 
        type: [{}]
    },
    total: { 
        type: Number
    },
    status: {
        type: String
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
});

export default OrderSchema;
