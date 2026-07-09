export interface IRentalOrderItem {
    gearItemId: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
}

export interface IRentalOrderPayload {
    items: IRentalOrderItem[];
}