export interface MenuItem {
  item: string;
  description: string;
  price: number;
}

export interface Restaurant {
  name: string;
  description: string;
  type: string;
  imageURL: string;
  menu: MenuItem[];
}
