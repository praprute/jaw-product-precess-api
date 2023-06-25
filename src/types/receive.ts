export interface IRecieveFishWeightBill {
  no: string;
  weigh_net: number;
  price_per_weigh: number;
  amount_price: number;
  vehicle_register: string;
  customer_name: string;
  product_name: string;
  store_name: string;
  description: string;
  order_connect?: number;
  stock?: number;
  date_action: string;
}
