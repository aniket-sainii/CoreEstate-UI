export interface Flat {
    id: number;
    name: string;
    buildingId: number;
    configurationId: number;
    facingId: number;
    statusId: number;
    floorNo: number;
    carpetArea: number;
    saleArea: number;
    createdAt: string;
    configuration?: any;
    facing?: any;
}