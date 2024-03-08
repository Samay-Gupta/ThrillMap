export interface OrderForm {
    restaurantName: string;
    desc: string;
    items: any[];
    total: number;
    status: string;
    date: Date;
}