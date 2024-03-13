export interface Ride {
    name: string;
    description: string;
    minHeight: number;
    duration: number;
    imageURL: string;
    category: string;
}

export interface RideSearchProps {
    name: string;
    category: string;
    minHeight: number;
}
