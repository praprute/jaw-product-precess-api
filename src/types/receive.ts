export interface IRecieveFishWeightBill {
  no: string;
  weigh_in: number;
  weigh_out: number;
  weigh_net: number;
  price_per_weigh: number;
  amount_price: number;
  time_in: string;
  time_out: string;
  vehicle_register: string;
  customer_name: string;
  product_name: string;
  store_name: string;
  description: string;
  order_connect?: number;
}
