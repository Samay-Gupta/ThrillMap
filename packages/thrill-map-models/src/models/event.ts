export interface Event {
    name: string;
    description: string;
    date: string;
    location: string;
    imageURL: string;
}

export interface EventSearchProps {
    name?: string;
    location?: string;
    date?: string;
}
