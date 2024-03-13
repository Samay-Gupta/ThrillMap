export interface MenuItem {
    item: string;
    description: string;
    price: number;
}

export interface Restaurant {
    restaurantId: string;
    name: string;
    description: string;
    type: string;
    imageURL: string;
    menu: MenuItem[];
}

export interface RestaurantSearchProps {
    restaurantId?: string;
    name?: string;
    type?: string;
}
