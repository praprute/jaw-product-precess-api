import { number, object, string, optional } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    submitCreateReceiveWeightFishSchema:
 *      type: object
 *      required:
 *        - no
 *        - weigh_net
 *        - price_per_weigh
 *        - amount_price
 *        - vehicle_register
 *        - customer_name
 *        - product_name
 *        - store_name
 *        - description
 *      properties:
 *        no:
 *          type: string
 *        weigh_net:
 *          type: number
 *        price_per_weigh:
 *          type: number
 *        amount_price:
 *          type: number
 *        vehicle_register:
 *          type: string
 *        customer_name:
 *          type: string
 *        product_name:
 *          type: string
 *        store_name:
 *          type: string
 *        description:
 *          type: string
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
export const billWeightFish = object({
  body: object({
    no: string({
      required_error: "no is require",
    }),
    weigh_net: number({
      required_error: "weigh_net is require",
    }),
    price_per_weigh: number({
      required_error: "price_per_weigh is require",
    }),
    amount_price: number({
      required_error: "amount_price is require",
    }),
    vehicle_register: string({
      required_error: "vehicle_register is require",
    }),
    customer_name: string({
      required_error: "customer_name is require",
    }),
    product_name: string({
      required_error: "product_name is require",
    }),
    store_name: string({
      required_error: "store_name is require",
    }),
    description: string().optional(),
  }),
});
