"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBuildingSchema = exports.idBuildingSchema = exports.buildingSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *  schemas:
 *    BuildingSchema:
 *      type: object
 *      required:
 *        - name
 *        - limit_pool
 *      properties:
 *        name:
 *          type: string
 *        limit_pool:
 *          type: number
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
/**
 * @openapi
 * components:
 *  schemas:
 *    IBuildingDto:
 *      type: object
 *      required:
 *        - idbuilding
 *        - name
 *        - limit_pool
 *        - date_create
 *      properties:
 *        idbuilding:
 *          type: number
 *        name:
 *          type: string
 *        limit_pool:
 *          type: number
 *        date_create:
 *          type: string
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
/**
 * @openapi
 * components:
 *  schemas:
 *    DeleteBuildingSchema:
 *      type: object
 *      required:
 *        - idbuilding
 *      properties:
 *        idbuilding:
 *          type: number
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.buildingSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is require",
        }),
        limit_pool: (0, zod_1.number)({
            required_error: "limit_pool is require",
        }),
    }),
});
exports.idBuildingSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        idbuilding: (0, zod_1.number)({
            required_error: "idbuilding is require",
        }),
    }),
});
/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateBuildingSchema:
 *      type: object
 *      required:
 *        - idbuilding
 *        - name
 *        - limit_pool
 *      properties:
 *        idbuilding:
 *          type: number
 *        name:
 *          type: string
 *        limit_pool:
 *          type: number
 *    ResponseSchema:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.updateBuildingSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        idbuilding: (0, zod_1.number)({
            required_error: "idbuilding is require",
        }),
        name: (0, zod_1.string)({
            required_error: "Name is require",
        }),
        limit_pool: (0, zod_1.number)({
            required_error: "limit_pool is require",
        }),
    }),
});
