export interface Order {
    orderId: string;
    restaurantId: string;
    desc: string;
    items: any[];
    total: number;
    status: string;
    date: Date;
}

export interface OrderSearchProps {
    orderId?: string;
    restaurantId?: string;
    status?: string;
    date?: string;
}
