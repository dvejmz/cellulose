export interface Resources {
  paper: Resource;
  pulp: Resource;
}

export interface Resource {
  name: string;
  quantity: number;
  quantityUnit: string;
  price: number;
  purchaseRate: number;
}
