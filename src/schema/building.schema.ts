import { number, object, string } from "zod";

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

export const buildingSchema = object({
  body: object({
    name: string({
      required_error: "Name is require",
    }),
    limit_pool: number({
      required_error: "limit_pool is require",
    }),
  }),
});

export const idBuildingSchema = object({
  body: object({
    idbuilding: number({
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

export const updateBuildingSchema = object({
  body: object({
    idbuilding: number({
      required_error: "idbuilding is require",
    }),
    name: string({
      required_error: "Name is require",
    }),
    limit_pool: number({
      required_error: "limit_pool is require",
    }),
  }),
});
