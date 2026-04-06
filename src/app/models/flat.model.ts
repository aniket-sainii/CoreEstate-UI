export interface Flat {
    id?: number;
    name: string;

    buildingId: number;
    configurationId: number;
    facingId: number;
    statusId: number;

    floorNo: number;
    carpetArea: number;
    saleArea: number;

    flatCosts: FlatCost[];
}

export interface FlatCost {
    id?: number;
    title: string;
    amount?: number;
    costTypeId: number;
}