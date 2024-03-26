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
  addOnAmpanTask,
  addOnFishSauceWaterTask,
  addOnFishyTask,
  addOnNonePrice,
  addOnSaltWaterTask,
  cancelGetInTask,
  changeVolumeForEdit,
  changeWorkingStatusPuddle,
  closeProcessTask,
  createFishType,
  createOrderTask,
  createPuddleTask,
  createTypeProcessTask,
  deleteFishType,
  exportFishSauceToNewPuddleTask,
  exportSaltWaterToNewPuddleTask,
  getAllOrdersFromPuddleTask,
  getAllPuddleTask,
  getAllTypeProcessTask,
  getDetailPuddleByIdTask,
  getLastedSubOrderById,
  getListFishType,
  getOrderDetailsTask,
  getSellingOrders,
  getSerialPuddleTask,
  getTargetPendingTask,
  submitImportFishTask,
  updateChemOrderTask,
  updateDateStartFermantTask,
  updateDescritionSubOrderTask,
  updateDetailPuddleTask,
  updatePriceSubOrderTask,
  updateProcessDescritionSubOrderTask,
  updateStatusTopSaltTask,
} from "./controller/product.controller";
import {
  createOrderSchema,
  createPuddleSchema,
  exportFishSauceToNewPuddleSchema,
  updateDetailPuddleSchema,
  updatePriceSubOrderSchema,
} from "./schema/product.schema";
import {
  createAmpanBillTask,
  createCustomer,
  createFiashSauceBillTask,
  createFishWeightBillTask,
  createFishyBillTask,
  createSaltBillTask,
  createSolidSaltBillTask,
  deleteCustomer,
  fillterReceiveAmpanTask,
  fillterReceiveFiashSauceTask,
  fillterReceiveFishyTask,
  fillterReceiveSaltTask,
  fillterReceiveSolidSaltTask,
  fillterReceiveWeightFishTask,
  getCustomerByBillTask,
  getCustomerByBillTaskPaginationTask,
  getListReceiveWeightFishTask,
  getLogReceiveFiashSauceByOrdersIdTask,
  getLogReceiveSaltByOrdersIdTask,
  getReceiveAmpanBillPaginationTask,
  getReceiveAmpanBillPaginationWithOutEmptyTask,
  getReceiveFiashSauceBillPaginationTask,
  getReceiveFiashSauceBillPaginationWithOutEmptyTask,
  getReceiveFishWeightPaginationTask,
  getReceiveFishWeightPaginationWithOutEmptyTask,
  getReceiveFishyBillPaginationTask,
  getReceiveFishyBillPaginationWithOutEmptyTask,
  getReceiveSaltBillPaginationTask,
  getReceiveSaltBillPaginationWithOutEmptyTask,
  getReceiveSolidSaltBillPaginationTask,
  getReceiveSolidSaltBillPaginationWithOutEmptyTask,
  getReceiveWeightFishByIdTask,
  getReceiveWeightFishByOrdersIdTask,
  searchReceiveFishWeightPaginationWithOutEmptyTask,
  searchReceiveSolidSaltPaginationWithOutEmptyTask,
  updateStockSolidSaltTask,
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
import {
  createWorkingStatus,
  deleteWorkingStatus,
  getListWorkingStatus,
} from "./controller/setting.controller";

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

  app.put(
    "/api/updateDescritionSubOrderTask",
    verifyToken,
    updateDescritionSubOrderTask
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

  app.post(
    "/api/getReceiveFishWeightPaginationTask/:page/:offset",
    verifyToken,
    getReceiveFishWeightPaginationTask
  );

  app.get(
    "/api/getReceiveFishWeightPaginationWithOutEmptyTask/:page/:offset",
    verifyToken,
    getReceiveFishWeightPaginationWithOutEmptyTask
  );
  app.get(
    "/api/searchReceiveFishWeightPaginationWithOutEmptyTask/:page/:offset/:search",
    verifyToken,
    searchReceiveFishWeightPaginationWithOutEmptyTask
  );

  app.post("/api/addOnSaltWaterTask", verifyToken, addOnSaltWaterTask);
  app.post("/api/updateStockTask", verifyToken, updateStockTask);

  app.get(
    "/api/getReceiveWeightFishByOrdersIdTask/:order_id",
    verifyToken,
    getReceiveWeightFishByOrdersIdTask
  );

  // ---------- Solid Salt Billing ------------------------

  app.post(
    "/api/createSolidSaltBillTask",
    verifyToken,
    createSolidSaltBillTask
  );

  app.get(
    "/api/getReceiveSolidSaltBillPaginationTask/:page/:offset",
    verifyToken,
    getReceiveSolidSaltBillPaginationTask
  );

  app.get(
    "/api/getReceiveSolidSaltBillPaginationWithOutEmptyTask/:page/:offset",
    verifyToken,
    getReceiveSolidSaltBillPaginationWithOutEmptyTask
  );

  app.get(
    "/api/searchReceiveSolidSaltPaginationWithOutEmptyTask/:page/:offset/:search",
    verifyToken,
    searchReceiveSolidSaltPaginationWithOutEmptyTask
  );

  app.post(
    "/api/fillterReceiveSolidSaltTask",
    verifyToken,
    fillterReceiveSolidSaltTask
  );

  app.post(
    "/api/updateStockSolidSaltTask",
    verifyToken,
    updateStockSolidSaltTask
  );

  // ---------- Salt Billing ------------------------

  app.post("/api/createSaltBillTask", verifyToken, createSaltBillTask);
  app.get(
    "/api/getReceiveSaltBillPaginationTask/:page/:offset",
    verifyToken,
    getReceiveSaltBillPaginationTask
  );
  app.get(
    "/api/getReceiveSaltBillPaginationWithOutEmptyTask/:page/:offset",
    verifyToken,
    getReceiveSaltBillPaginationWithOutEmptyTask
  );
  // getReceiveSaltBillPaginationWithOutEmptyTask
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
  // ---------- Ampan Billing ------------------------
  app.post("/api/createAmpanBillTask", verifyToken, createAmpanBillTask);

  app.post(
    "/api/getReceiveAmpanBillPaginationTask/:page/:offset",
    verifyToken,
    getReceiveAmpanBillPaginationTask
  );
  app.post(
    "/api/fillterReceiveAmpanTask",
    verifyToken,
    fillterReceiveAmpanTask
  );

  app.get(
    "/api/getReceiveAmpanBillPaginationWithOutEmptyTask/:page/:offset",
    verifyToken,
    getReceiveAmpanBillPaginationWithOutEmptyTask
  );

  app.post("/api/addOnAmpanTask", verifyToken, addOnAmpanTask);

  // ---------- Fishy Billing ------------------------

  app.post("/api/createFishyBillTask", verifyToken, createFishyBillTask);

  app.post(
    "/api/getReceiveFishyBillPaginationTask/:page/:offset",
    verifyToken,
    getReceiveFishyBillPaginationTask
  );
  app.post(
    "/api/fillterReceiveFishyTask",
    verifyToken,
    fillterReceiveFishyTask
  );

  app.get(
    "/api/getReceiveFishyBillPaginationWithOutEmptyTask/:page/:offset",
    verifyToken,
    getReceiveFishyBillPaginationWithOutEmptyTask
  );

  app.post("/api/addOnFishyTask", verifyToken, addOnFishyTask);

  // ---------- fish sauce Billing ------------------------

  app.post(
    "/api/createFiashSauceBillTask",
    verifyToken,
    createFiashSauceBillTask
  );

  app.post(
    "/api/getReceiveFiashSauceBillPaginationTask/:page/:offset",
    verifyToken,
    getReceiveFiashSauceBillPaginationTask
  );

  app.get(
    "/api/getReceiveFiashSauceBillPaginationWithOutEmptyTask/:page/:offset",
    verifyToken,
    getReceiveFiashSauceBillPaginationWithOutEmptyTask
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
  app.post("/api/addOnNonePrice", verifyToken, addOnNonePrice);

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

  // ---------- Fish type  ------------------------
  app.get("/api/getListFishType", getListFishType);
  app.post("/api/createFishType", verifyToken, createFishType);
  app.delete("/api/deleteFishType/:idfish_type", verifyToken, deleteFishType);
  // ---------- Setting Working Status type  ------------------------
  app.get("/api/getListWorkingStatus", getListWorkingStatus);
  app.post("/api/createWorkingStatus", verifyToken, createWorkingStatus);
  app.delete(
    "/api/deleteWorkingStatus/:idworking_status",
    verifyToken,
    deleteWorkingStatus
  );
  app.put(
    "/api/changeWorkingStatusPuddle",
    verifyToken,
    changeWorkingStatusPuddle
  );

  // ---------- status top salt ------------------------

  app.put("/api/updateStatusTopSaltTask", verifyToken, updateStatusTopSaltTask);

  // ---------- DateStartFermant------------------------

  app.put(
    "/api/updateDateStartFermantTask",
    verifyToken,
    updateDateStartFermantTask
  );

  // ---------- customer ----------
  app.get(
    "/api/getCustomerByBillTask/:type_bill",
    verifyToken,
    getCustomerByBillTask
  );

  app.get(
    "/api/getCustomerByBillTaskPaginationTask/:page/:offset/:type_bill",
    verifyToken,
    getCustomerByBillTaskPaginationTask
  );
  app.post("/api/createCustomer", verifyToken, createCustomer);
  app.delete(
    "/api/deleteCustomer/:idcustomer_bill",
    verifyToken,
    deleteCustomer
  );

  // ---------- Chem------------------------

  app.put("/api/updateChemOrderTask", verifyToken, updateChemOrderTask);

  // ---------- Mix Sauce Feature ------------------------

  app.get("/api/getLastedSubOrderById/", verifyToken, getLastedSubOrderById);

  // ---------- Change Volume Feature ------------------------

  app.put("/api/changeVolumeForEdit", verifyToken, changeVolumeForEdit);

  app.get(
    "/api/getSellingOrdersTask/:page/:offset",
    verifyToken,
    getSellingOrders
  );
}

export default routes;
