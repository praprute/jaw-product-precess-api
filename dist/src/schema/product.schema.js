"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitImportFishSchema = exports.exportFishSauceToNewPuddleSchema = exports.updatePriceSubOrderSchema = exports.createOrderSchema = exports.updateDetailPuddleSchema = exports.createPuddleSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePuddleSchema:
 *      type: object
 *      required:
 *        - building_id
 *        - serial
 *      properties:
 *        building_id:
 *          type: number
 *        serial:
 *          type: string
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.createPuddleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        building_id: (0, zod_1.number)({
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
exports.updateDetailPuddleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        building_id: (0, zod_1.number)({
            required_error: "building_id is require",
        }),
        status: (0, zod_1.number)({
            required_error: "status is require",
        }),
        uuid_puddle: (0, zod_1.string)({
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
 *        - puddle_id
 *        - status_puddle_order
 *        - fish
 *        - salt
 *        - laber
 *        - description
 *        - volume
 *        - fish_price
 *        - salt_price
 *        - laber_price
 *        - amount_items
 *      properties:
 *        order_name:
 *          type: string
 *        uuid_puddle:
 *          type: string
 *        puddle_id:
 *          type: number
 *        status_puddle_order:
 *          type: number
 *        fish:
 *          type: number
 *        salt:
 *          type: number
 *        laber:
 *          type: number
 *        description:
 *          type: string
 *        volume:
 *          type: number
 *        fish_price:
 *          type: number
 *        salt_price:
 *          type: number
 *        laber_price:
 *          type: number
 *        amount_items:
 *          type: number
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.createOrderSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        order_name: (0, zod_1.string)({
            required_error: "order_name is require",
        }),
        uuid_puddle: (0, zod_1.string)({
            required_error: "uuid_puddle is require",
        }),
        puddle_id: (0, zod_1.number)({
            required_error: "puddle_id is require",
        }),
        status_puddle_order: (0, zod_1.number)({
            required_error: "status_puddle_order is require",
        }),
        fish: (0, zod_1.number)({
            required_error: "fish is require",
        }),
        salt: (0, zod_1.number)({
            required_error: "salt is require",
        }),
        laber: (0, zod_1.number)({
            required_error: "laber is require",
        }),
        description: (0, zod_1.string)(),
        volume: (0, zod_1.number)({
            required_error: "volume is require",
        }),
        fish_price: (0, zod_1.number)({
            required_error: "fish_price is require",
        }),
        salt_price: (0, zod_1.number)({
            required_error: "salt_price is require",
        }),
        laber_price: (0, zod_1.number)({
            required_error: "laber_price is require",
        }),
        amount_items: (0, zod_1.number)({
            required_error: "amount_items is require",
        }),
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
exports.updatePriceSubOrderSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        fish_price: (0, zod_1.number)({
            required_error: "fish_price is require",
        }),
        salt_price: (0, zod_1.number)({
            required_error: "salt_price is require",
        }),
        laber_price: (0, zod_1.number)({
            required_error: "laber_price is require",
        }),
        amount_items: (0, zod_1.number)({
            required_error: "amount_items is require",
        }),
        idsub_orders: (0, zod_1.number)({
            required_error: "idsub_orders is require",
        }),
        uuid_order: (0, zod_1.string)({
            required_error: "uuid_order is require",
        }),
    }),
});
/**
 * @openapi
 * components:
 *  schemas:
 *    exportFishSauceToNewPuddleSchema:
 *      type: object
 *      required:
 *        - order_id
 *        - type_process
 *        - amount_items
 *        - amount_unit_per_price
 *        - amount_price
 *        - remaining_items
 *        - remaining_unit_per_price
 *        - remaining_price
 *        - approved
 *        - volume
 *        - id_puddle
 *        - remaining_volume
 *        - action_puddle
 *        - target_puddle
 *      properties:
 *        order_id:
 *          type: number
 *        type_process:
 *          type: number
 *        amount_items:
 *          type: number
 *        amount_unit_per_price:
 *          type: number
 *        amount_price:
 *          type: number
 *        remaining_items:
 *          type: number
 *        remaining_unit_per_price:
 *          type: number
 *        remaining_price:
 *          type: number
 *        approved:
 *          type: number
 *        volume:
 *          type: number
 *        id_puddle:
 *          type: number
 *        remaining_volume:
 *          type: number
 *        action_puddle:
 *          type: number
 *        target_puddle:
 *          type: number
 *        process:
 *          type: number | unknow
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.exportFishSauceToNewPuddleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        order_id: (0, zod_1.number)({
            required_error: "order_id is require",
        }),
        type_process: (0, zod_1.number)({
            required_error: "type_process is require",
        }),
        amount_items: (0, zod_1.number)({
            required_error: "amount_items is require",
        }),
        amount_unit_per_price: (0, zod_1.number)({
            required_error: "amount_unit_per_price is require",
        }),
        amount_price: (0, zod_1.number)({
            required_error: "amount_price is require",
        }),
        remaining_items: (0, zod_1.number)({
            required_error: "remaining_items is require",
        }),
        remaining_unit_per_price: (0, zod_1.number)({
            required_error: "remaining_unit_per_price is require",
        }),
        remaining_price: (0, zod_1.number)({
            required_error: "remaining_price is require",
        }),
        approved: (0, zod_1.number)({
            required_error: "approved is require",
        }),
        volume: (0, zod_1.number)({
            required_error: "volume is require",
        }),
        id_puddle: (0, zod_1.number)({
            required_error: "id_puddle is require",
        }),
        remaining_volume: (0, zod_1.number)({
            required_error: "remaining_volume is require",
        }),
        action_puddle: (0, zod_1.number)({
            required_error: "action_puddle is require",
        }),
        target_puddle: (0, zod_1.number)({
            required_error: "target_puddle is require",
        }),
        // process: number(),
    }),
});
/**
 * @openapi
 * components:
 *  schemas:
 *    submitImportFishSchema:
 *      type: object
 *      required:
 *        - order_id
 *        - type_process
 *        - amount_items
 *        - amount_price
 *        - remaining_items
 *        - remaining_price
 *        - idtarget_puddle
 *        - lasted_subId
 *        - volume
 *        - remaining_volume
 *        - action_puddle
 *        - action_serial_puddle
 *      properties:
 *        order_id:
 *          type: number
 *        type_process:
 *          type: number
 *        amount_items:
 *          type: number
 *        amount_price:
 *          type: number
 *        remaining_items:
 *          type: number
 *        remaining_price:
 *          type: number
 *        idtarget_puddle:
 *          type: number
 *        lasted_subId:
 *          type: number
 *        volume:
 *          type: number
 *        remaining_volume:
 *          type: number
 *        action_puddle:
 *          type: number
 *        action_serial_puddle:
 *          type: number
 *        process:
 *          type: number | unknow
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.submitImportFishSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        order_id: (0, zod_1.number)({
            required_error: "order_id is require",
        }),
        type_process: (0, zod_1.number)({
            required_error: "type_process is require",
        }),
        amount_items: (0, zod_1.number)({
            required_error: "amount_items is require",
        }),
        amount_price: (0, zod_1.number)({
            required_error: "amount_price is require",
        }),
        remaining_items: (0, zod_1.number)({
            required_error: "remaining_items is require",
        }),
        remaining_price: (0, zod_1.number)({
            required_error: "remaining_price is require",
        }),
        idtarget_puddle: (0, zod_1.number)({
            required_error: "idtarget_puddle is require",
        }),
        lasted_subId: (0, zod_1.number)({
            required_error: "lasted_subId is require",
        }),
        volume: (0, zod_1.number)({
            required_error: "volume is require",
        }),
        action_puddle: (0, zod_1.number)({
            required_error: "action_puddle is require",
        }),
        action_serial_puddle: (0, zod_1.number)({
            required_error: "action_puddle is require",
        }),
        process: (0, zod_1.number)({}),
    }),
});
