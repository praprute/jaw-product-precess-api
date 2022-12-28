import { number, object, string } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePuddleSchema:
 *      type: object
 *      required:
 *        - building_id
 *      properties:
 *        building_id:
 *          type: number
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */

export const createPuddleSchema = object({
  body: object({
    building_id: number({
      required_error: "building_id is require",
    }),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateDetailPuddleSchema:
 *      type: object
 *      required:
 *        - building_id
 *        - status
 *        - uuid_puddle
 *      properties:
 *        building_id:
 *          type: number
 *        status:
 *          type: number
 *        uuid_puddle:
 *          type: string
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */

export const updateDetailPuddleSchema = object({
  body: object({
    building_id: number({
      required_error: "building_id is require",
    }),
    status: number({
      required_error: "status is require",
    }),
    uuid_puddle: string({
      required_error: "uuid_puddle is require",
    }),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateOrderSchema:
 *      type: object
 *      required:
 *        - order_name
 *        - uuid_puddle
 *        - fish
 *        - salt
 *        - laber
 *        - description
 *      properties:
 *        order_name:
 *          type: string
 *        uuid_puddle:
 *          type: string
 *        fish:
 *          type: number
 *        salt:
 *          type: number
 *        laber:
 *          type: number
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

export const createOrderSchema = object({
  body: object({
    order_name: string({
      required_error: "order_name is require",
    }),
    uuid_puddle: string({
      required_error: "uuid_puddle is require",
    }),
    fish: number({
      required_error: "fish is require",
    }),
    salt: number({
      required_error: "salt is require",
    }),
    laber: number({
      required_error: "laber is require",
    }),
    description: string(),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdatePriceSubOrderSchema:
 *      type: object
 *      required:
 *        - fish_price
 *        - salt_price
 *        - laber_price
 *        - amount_items
 *        - idsub_orders
 *        - uuid_order
 *      properties:
 *        fish_price:
 *          type: number
 *        salt_price:
 *          type: number
 *        laber_price:
 *          type: number
 *        amount_items:
 *          type: number
 *        idsub_orders:
 *          type: number
 *        uuid_order:
 *          type: string
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
export const updatePriceSubOrderSchema = object({
  body: object({
    fish_price: number({
      required_error: "fish_price is require",
    }),
    salt_price: number({
      required_error: "salt_price is require",
    }),
    laber_price: number({
      required_error: "laber_price is require",
    }),
    amount_items: number({
      required_error: "amount_items is require",
    }),
    idsub_orders: number({
      required_error: "idsub_orders is require",
    }),
    uuid_order: string({
      required_error: "uuid_order is require",
    }),
  }),
});
