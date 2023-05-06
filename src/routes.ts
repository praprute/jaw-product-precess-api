import express, { Express } from "express";
import {
  createUserTask,
  getUserInfoTask,
  signInTask,
} from "./controller/auth.controller";
import { createUserSchema, signInUserSchema } from "./schema/user.schema";

import validatResource from "./middleware/validateResource";
import verifyToken from "./utils/verifyToken";
import {
  createBuildingTask,
  deleteBuildingTask,
  getBuildingTask,
  getCountingPuddleFromBuildingTask,
  updateBuildingTask,
} from "./controller/building.controller";
import {
  buildingSchema,
  idBuildingSchema,
  updateBuildingSchema,
} from "./schema/building.schema";
import {
  addOnFishSauceWaterTask,
  addOnSaltWaterTask,
  cancelGetInTask,
  closeProcessTask,
  createOrderTask,
  createPuddleTask,
  createTypeProcessTask,
  exportFishSauceToNewPuddleTask,
  exportSaltWaterToNewPuddleTask,
  getAllOrdersFromPuddleTask,
  getAllPuddleTask,
  getAllTypeProcessTask,
  getDetailPuddleByIdTask,
  getOrderDetailsTask,
  getSerialPuddleTask,
  getTargetPendingTask,
  submitImportFishTask,
  updateDetailPuddleTask,
  updatePriceSubOrderTask,
  updateProcessDescritionSubOrderTask,
} from "./controller/product.controller";
import {
  createOrderSchema,
  createPuddleSchema,
  exportFishSauceToNewPuddleSchema,
  updateDetailPuddleSchema,
  updatePriceSubOrderSchema,
} from "./schema/product.schema";
import {
  createFiashSauceBillTask,
  createFishWeightBillTask,
  createSaltBillTask,
  fillterReceiveFiashSauceTask,
  fillterReceiveSaltTask,
  fillterReceiveWeightFishTask,
  getListReceiveWeightFishTask,
  getLogReceiveFiashSauceByOrdersIdTask,
  getLogReceiveSaltByOrdersIdTask,
  getReceiveFiashSauceBillPaginationTask,
  getReceiveFishWeightPaginationTask,
  getReceiveSaltBillPaginationTask,
  getReceiveWeightFishByIdTask,
  getReceiveWeightFishByOrdersIdTask,
  updateStockTask,
} from "./controller/receive.controller";
import { billWeightFish } from "./schema/receive.schema";
import {
  createFeeLaborFerMent,
  createFeeLaborPerBuilding,
  getAllFeeLaborFerment,
  getAllFeeLaborPerBuilding,
  getFeeLaborPerBuildingByBuilding,
  updateFeeLaborFerment,
  updateFeeLaborPerBuilding,
} from "./controller/fee.controller";

function routes(app: Express) {
  /**
   * @openapi
   * '/api/insertUser':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/insertUser",
    validatResource(createUserSchema),
    createUserTask
  );
  /**
   * @openapi
   * '/api/signin':
   *  post:
   *     tags:
   *     - User
   *     summary: Signin a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/SignInUser'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/signin", validatResource(signInUserSchema), signInTask);
  /**
   * @openapi
   * /api/info:
   *  get:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - User
   *     summary: get info by uuid
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/api/info", verifyToken, getUserInfoTask);

  // **** Building ****

  /**
   * @openapi
   * '/api/createBuilding':
   *  post:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Building
   *     summary: Create Building
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/BuildingSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BuildingSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/createBuilding",
    verifyToken,
    validatResource(buildingSchema),
    createBuildingTask
  );

  /**
   * @openapi
   * '/api/getAllBuilding':
   *  get:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Building
   *     summary: All Building
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/IBuildingDto'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.get("/api/getAllBuilding", verifyToken, getBuildingTask);

  /**
   * @openapi
   * '/api/deleteBuildingById':
   *  delete:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Building
   *     summary: Delete Building
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/DeleteBuildingSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/DeleteBuildingSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.delete(
    "/api/deleteBuildingById",
    verifyToken,
    validatResource(idBuildingSchema),
    deleteBuildingTask
  );

  /**
   * @openapi
   * '/api/updateBuilding':
   *  put:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Building
   *     summary: Update Building
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateBuildingSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UpdateBuildingSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.put(
    "/api/updateBuilding",
    verifyToken,
    validatResource(updateBuildingSchema),
    updateBuildingTask
  );

  /**
   * @openapi
   * '/api/getCountingPuddleFromBuilding/{building_id}':
   *  get:
   *     tags:
   *     - Building
   *     summary: getCountingPuddleFromBuilding
   *     parameters:
   *      - name: building_id
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *       404:
   *         description: Product not found
   */

  app.get(
    "/api/getCountingPuddleFromBuilding/:building_id",
    verifyToken,
    getCountingPuddleFromBuildingTask
  );

  // **** Puddle ****

  /**
   * @openapi
   * '/api/createPuddle':
   *  post:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Puddle
   *     summary: Create Puddle
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreatePuddleSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreatePuddleSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/createPuddle",
    verifyToken,
    validatResource(createPuddleSchema),
    createPuddleTask
  );

  /**
   * @openapi
   * '/api/updateDetailPuddle':
   *  put:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Puddle
   *     summary: Update Detail Puddle example Building and Status puddle
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateDetailPuddleSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UpdateDetailPuddleSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.put(
    "/api/updateDetailPuddle",
    verifyToken,
    validatResource(updateDetailPuddleSchema),
    updateDetailPuddleTask
  );

  /**
   * @openapi
   * '/api/getAllPuddle/{building_id}':
   *  get:
   *     tags:
   *     - Puddle
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: building_id
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *       404:
   *         description: Product not found
   */
  app.get("/api/getAllPuddle/:building_id", verifyToken, getAllPuddleTask);
  /**
   * @openapi
   * '/api/getDetailPuddleById/{puddle_id}':
   *  get:
   *     tags:
   *     - Puddle
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: puddle_id
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *       404:
   *         description: Product not found
   */
  app.get(
    "/api/getDetailPuddleById/:puddle_id",
    verifyToken,
    getDetailPuddleByIdTask
  );

  /**
   * @openapi
   * '/api/createOrder':
   *  post:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Puddle
   *     summary: Create Puddle
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateOrderSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/createOrder",
    verifyToken,
    validatResource(createOrderSchema),
    createOrderTask
  );

  /**
   * @openapi
   * '/api/getOrderDetails/{order_id}':
   *  get:
   *     tags:
   *     - Puddle
   *     summary: Get Order Details
   *     parameters:
   *      - name: order_id
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *       404:
   *         description: Product not found
   */
  app.get("/api/getOrderDetails/:order_id", verifyToken, getOrderDetailsTask);

  /**
   * @openapi
   * '/api/getAllOrdersFromPuddleId/{id_puddle}':
   *  get:
   *     tags:
   *     - Puddle
   *     summary: Get Order Details
   *     parameters:
   *      - name: id_puddle
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *       404:
   *         description: Product not found
   */
  app.get(
    "/api/getAllOrdersFromPuddleId/:id_puddle",
    verifyToken,
    getAllOrdersFromPuddleTask
  );

  /**
   * @openapi
   * '/api/updatePriceSubOrder':
   *  put:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Puddle
   *     summary: Create Puddle
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdatePriceSubOrderSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.put(
    "/api/updatePriceSubOrder",
    verifyToken,
    validatResource(updatePriceSubOrderSchema),
    updatePriceSubOrderTask
  );

  /**
   * @openapi
   * '/api/getTargetPending/{id_puddle}':
   *  get:
   *     tags:
   *     - Puddle
   *     summary: Get Order Details
   *     parameters:
   *      - name: id_puddle
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: any
   *       404:
   *         description: Product not found
   */
  app.get(
    "/api/getTargetPending/:id_puddle",
    verifyToken,
    getTargetPendingTask
  );

  /**
   * @openapi
   * '/api/exportFishSauce':
   *  post:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Puddle
   *     summary: exportFishSauce
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/exportFishSauceToNewPuddleSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/exportFishSauceToNewPuddleSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/exportFishSauce",
    verifyToken,
    validatResource(exportFishSauceToNewPuddleSchema),
    exportFishSauceToNewPuddleTask
  );

  /**
   * @openapi
   * '/api/submitImportFish':
   *  post:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Puddle
   *     summary: submitImportFish
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/submitImportFishSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/submitImportFishSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/submitImportFish", verifyToken, submitImportFishTask);

  app.delete("/api/cancelGetIn", verifyToken, cancelGetInTask);

  app.get("/api/getSerialPuddle/:idpuddle", verifyToken, getSerialPuddleTask);

  app.get("/api/getAllTypeProcess", verifyToken, getAllTypeProcessTask);

  app.post("/api/createTypeProcess", verifyToken, createTypeProcessTask);

  app.put(
    "/api/updateProcessDescritionSubOrder",
    verifyToken,
    updateProcessDescritionSubOrderTask
  );

  app.post("/api/closeProcess", verifyToken, closeProcessTask);

  // **** Receive ****

  /**
   * @openapi
   * '/api/submitCreateReceiveWeightFish':
   *  post:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Receive
   *     summary: Create receive weight fish
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/submitCreateReceiveWeightFishSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/submitCreateReceiveWeightFishSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/submitCreateReceiveWeightFish",
    verifyToken,
    validatResource(billWeightFish),
    createFishWeightBillTask
  );

  /**
   * @openapi
   * '/api/getListReceiveWeightFish':
   *  get:
   *     security:
   *     - bearerAuth: []
   *     tags:
   *     - Receive
   *     summary: getListReceiveWeightFish
   *     requestBody:
   *      required: false
   *
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/submitCreateReceiveWeightFishSchema'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.get(
    "/api/getListReceiveWeightFish",
    verifyToken,
    getListReceiveWeightFishTask
  );

  app.post(
    "/api/fillterReceiveWeightFish",
    verifyToken,
    fillterReceiveWeightFishTask
  );

  app.get(
    "/api/getReceiveWeightFishById/:idreceipt",
    verifyToken,
    getReceiveWeightFishByIdTask
  );

  app.get(
    "/api/getReceiveFishWeightPaginationTask/:page/:offset",
    verifyToken,
    getReceiveFishWeightPaginationTask
  );

  app.post("/api/addOnSaltWaterTask", verifyToken, addOnSaltWaterTask);
  app.post("/api/updateStockTask", verifyToken, updateStockTask);

  app.get(
    "/api/getReceiveWeightFishByOrdersIdTask/:order_id",
    verifyToken,
    getReceiveWeightFishByOrdersIdTask
  );

  // ---------- Salt Billing ------------------------

  app.post("/api/createSaltBillTask", verifyToken, createSaltBillTask);
  app.get(
    "/api/getReceiveSaltBillPaginationTask/:page/:offset",
    verifyToken,
    getReceiveSaltBillPaginationTask
  );
  app.post("/api/fillterReceiveSaltTask", verifyToken, fillterReceiveSaltTask);

  app.get(
    "/api/getLogReceiveSaltByOrdersIdTask/:order_id",
    verifyToken,
    getLogReceiveSaltByOrdersIdTask
  );

  app.post(
    "/api/exportSaltWaterToNewPuddleTask",
    verifyToken,
    exportSaltWaterToNewPuddleTask
  );

  // ---------- fish sauce Billing ------------------------

  app.post(
    "/api/createFiashSauceBillTask",
    verifyToken,
    createFiashSauceBillTask
  );
  app.get(
    "/api/getReceiveFiashSauceBillPaginationTask/:page/:offset",
    verifyToken,
    getReceiveFiashSauceBillPaginationTask
  );
  app.post(
    "/api/fillterReceiveFiashSauceTask",
    verifyToken,
    fillterReceiveFiashSauceTask
  );

  app.get(
    "/api/getLogReceiveFiashSauceByOrdersIdTask/:order_id",
    verifyToken,
    getLogReceiveFiashSauceByOrdersIdTask
  );

  app.post(
    "/api/addOnFishSauceWaterTask",
    verifyToken,
    addOnFishSauceWaterTask
  );

  // ---------- Labor cost  ------------------------

  app.post(
    "/api/createFeeLaborPerBuilding",
    verifyToken,
    createFeeLaborPerBuilding
  );
  app.post("/api/createFeeLaborFerMent", verifyToken, createFeeLaborFerMent);
  app.put(
    "/api/updateFeeLaborPerBuilding",
    verifyToken,
    updateFeeLaborPerBuilding
  );
  app.put("/api/updateFeeLaborFerment", verifyToken, updateFeeLaborFerment);
  app.get(
    "/api/getAllFeeLaborPerBuilding",
    verifyToken,
    getAllFeeLaborPerBuilding
  );
  app.get(
    "/api/getFeeLaborPerBuildingByBuilding/:id_building",
    verifyToken,
    getFeeLaborPerBuildingByBuilding
  );
  app.get("/api/getAllFeeLaborFerment", verifyToken, getAllFeeLaborFerment);
}

export default routes;
