export interface Building {
  id: number;
  name: string;
  description: string;
}

export interface projectBuilding {
  id: number;
  name: string;
  description: string;
  buildings?: Building[];
}