"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./controller/auth.controller");
const user_schema_1 = require("./schema/user.schema");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const verifyToken_1 = __importDefault(require("./utils/verifyToken"));
const building_controller_1 = require("./controller/building.controller");
const building_schema_1 = require("./schema/building.schema");
const product_controller_1 = require("./controller/product.controller");
const product_schema_1 = require("./schema/product.schema");
const receive_controller_1 = require("./controller/receive.controller");
const receive_schema_1 = require("./schema/receive.schema");
const fee_controller_1 = require("./controller/fee.controller");
function routes(app) {
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
    app.post("/api/insertUser", (0, validateResource_1.default)(user_schema_1.createUserSchema), auth_controller_1.createUserTask);
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
    app.post("/api/signin", (0, validateResource_1.default)(user_schema_1.signInUserSchema), auth_controller_1.signInTask);
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
    app.get("/api/info", verifyToken_1.default, auth_controller_1.getUserInfoTask);
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
    app.post("/api/createBuilding", verifyToken_1.default, (0, validateResource_1.default)(building_schema_1.buildingSchema), building_controller_1.createBuildingTask);
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
    app.get("/api/getAllBuilding", verifyToken_1.default, building_controller_1.getBuildingTask);
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
    app.delete("/api/deleteBuildingById", verifyToken_1.default, (0, validateResource_1.default)(building_schema_1.idBuildingSchema), building_controller_1.deleteBuildingTask);
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
    app.put("/api/updateBuilding", verifyToken_1.default, (0, validateResource_1.default)(building_schema_1.updateBuildingSchema), building_controller_1.updateBuildingTask);
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
    app.get("/api/getCountingPuddleFromBuilding/:building_id", verifyToken_1.default, building_controller_1.getCountingPuddleFromBuildingTask);
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
    app.post("/api/createPuddle", verifyToken_1.default, (0, validateResource_1.default)(product_schema_1.createPuddleSchema), product_controller_1.createPuddleTask);
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
    app.put("/api/updateDetailPuddle", verifyToken_1.default, (0, validateResource_1.default)(product_schema_1.updateDetailPuddleSchema), product_controller_1.updateDetailPuddleTask);
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
    app.get("/api/getAllPuddle/:building_id", verifyToken_1.default, product_controller_1.getAllPuddleTask);
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
    app.get("/api/getDetailPuddleById/:puddle_id", verifyToken_1.default, product_controller_1.getDetailPuddleByIdTask);
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
    app.post("/api/createOrder", verifyToken_1.default, (0, validateResource_1.default)(product_schema_1.createOrderSchema), product_controller_1.createOrderTask);
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
    app.get("/api/getOrderDetails/:order_id", verifyToken_1.default, product_controller_1.getOrderDetailsTask);
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
    app.get("/api/getAllOrdersFromPuddleId/:id_puddle", verifyToken_1.default, product_controller_1.getAllOrdersFromPuddleTask);
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
    app.put("/api/updatePriceSubOrder", verifyToken_1.default, (0, validateResource_1.default)(product_schema_1.updatePriceSubOrderSchema), product_controller_1.updatePriceSubOrderTask);
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
    app.get("/api/getTargetPending/:id_puddle", verifyToken_1.default, product_controller_1.getTargetPendingTask);
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
    app.post("/api/exportFishSauce", verifyToken_1.default, (0, validateResource_1.default)(product_schema_1.exportFishSauceToNewPuddleSchema), product_controller_1.exportFishSauceToNewPuddleTask);
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
    app.post("/api/submitImportFish", verifyToken_1.default, product_controller_1.submitImportFishTask);
    app.delete("/api/cancelGetIn", verifyToken_1.default, product_controller_1.cancelGetInTask);
    app.get("/api/getSerialPuddle/:idpuddle", verifyToken_1.default, product_controller_1.getSerialPuddleTask);
    app.get("/api/getAllTypeProcess", verifyToken_1.default, product_controller_1.getAllTypeProcessTask);
    app.post("/api/createTypeProcess", verifyToken_1.default, product_controller_1.createTypeProcessTask);
    app.put("/api/updateProcessDescritionSubOrder", verifyToken_1.default, product_controller_1.updateProcessDescritionSubOrderTask);
    app.post("/api/closeProcess", verifyToken_1.default, product_controller_1.closeProcessTask);
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
    app.post("/api/submitCreateReceiveWeightFish", verifyToken_1.default, (0, validateResource_1.default)(receive_schema_1.billWeightFish), receive_controller_1.createFishWeightBillTask);
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
    app.get("/api/getListReceiveWeightFish", verifyToken_1.default, receive_controller_1.getListReceiveWeightFishTask);
    app.post("/api/fillterReceiveWeightFish", verifyToken_1.default, receive_controller_1.fillterReceiveWeightFishTask);
    app.get("/api/getReceiveWeightFishById/:idreceipt", verifyToken_1.default, receive_controller_1.getReceiveWeightFishByIdTask);
    app.get("/api/getReceiveFishWeightPaginationTask/:page/:offset", verifyToken_1.default, receive_controller_1.getReceiveFishWeightPaginationTask);
    app.post("/api/addOnSaltWaterTask", verifyToken_1.default, product_controller_1.addOnSaltWaterTask);
    app.post("/api/updateStockTask", verifyToken_1.default, receive_controller_1.updateStockTask);
    app.get("/api/getReceiveWeightFishByOrdersIdTask/:order_id", verifyToken_1.default, receive_controller_1.getReceiveWeightFishByOrdersIdTask);
    // ---------- Solid Salt Billing ------------------------
    app.post("/api/createSolidSaltBillTask", verifyToken_1.default, receive_controller_1.createSolidSaltBillTask);
    app.get("/api/getReceiveSolidSaltBillPaginationTask/:page/:offset", verifyToken_1.default, receive_controller_1.getReceiveSolidSaltBillPaginationTask);
    app.post("/api/fillterReceiveSolidSaltTask", verifyToken_1.default, receive_controller_1.fillterReceiveSolidSaltTask);
    app.post("/api/updateStockSolidSaltTask", verifyToken_1.default, receive_controller_1.updateStockSolidSaltTask);
    // ---------- Salt Billing ------------------------
    app.post("/api/createSaltBillTask", verifyToken_1.default, receive_controller_1.createSaltBillTask);
    app.get("/api/getReceiveSaltBillPaginationTask/:page/:offset", verifyToken_1.default, receive_controller_1.getReceiveSaltBillPaginationTask);
    app.post("/api/fillterReceiveSaltTask", verifyToken_1.default, receive_controller_1.fillterReceiveSaltTask);
    app.get("/api/getLogReceiveSaltByOrdersIdTask/:order_id", verifyToken_1.default, receive_controller_1.getLogReceiveSaltByOrdersIdTask);
    app.post("/api/exportSaltWaterToNewPuddleTask", verifyToken_1.default, product_controller_1.exportSaltWaterToNewPuddleTask);
    // ---------- fish sauce Billing ------------------------
    app.post("/api/createFiashSauceBillTask", verifyToken_1.default, receive_controller_1.createFiashSauceBillTask);
    app.get("/api/getReceiveFiashSauceBillPaginationTask/:page/:offset", verifyToken_1.default, receive_controller_1.getReceiveFiashSauceBillPaginationTask);
    app.post("/api/fillterReceiveFiashSauceTask", verifyToken_1.default, receive_controller_1.fillterReceiveFiashSauceTask);
    app.get("/api/getLogReceiveFiashSauceByOrdersIdTask/:order_id", verifyToken_1.default, receive_controller_1.getLogReceiveFiashSauceByOrdersIdTask);
    app.post("/api/addOnFishSauceWaterTask", verifyToken_1.default, product_controller_1.addOnFishSauceWaterTask);
    // ---------- Labor cost  ------------------------
    app.post("/api/createFeeLaborPerBuilding", verifyToken_1.default, fee_controller_1.createFeeLaborPerBuilding);
    app.post("/api/createFeeLaborFerMent", verifyToken_1.default, fee_controller_1.createFeeLaborFerMent);
    app.put("/api/updateFeeLaborPerBuilding", verifyToken_1.default, fee_controller_1.updateFeeLaborPerBuilding);
    app.put("/api/updateFeeLaborFerment", verifyToken_1.default, fee_controller_1.updateFeeLaborFerment);
    app.get("/api/getAllFeeLaborPerBuilding", verifyToken_1.default, fee_controller_1.getAllFeeLaborPerBuilding);
    app.get("/api/getFeeLaborPerBuildingByBuilding/:id_building", verifyToken_1.default, fee_controller_1.getFeeLaborPerBuildingByBuilding);
    app.get("/api/getAllFeeLaborFerment", verifyToken_1.default, fee_controller_1.getAllFeeLaborFerment);
}
exports.default = routes;
