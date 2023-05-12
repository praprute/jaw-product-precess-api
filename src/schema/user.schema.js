"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - phone
 *        - email
 *        - name
 *        - password
 *      properties:
 *        phone:
 *          type: string
 *          default: 0990576873
 *        email:
 *          type: string
 *          default: test@gmail.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: 1234
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is require",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is require",
        }),
        phone: (0, zod_1.string)({
            required_error: "Phone is require",
        })
            .max(10, "Phone should 10 char")
            .min(10, "Phone should 10 char"),
    }),
    email: (0, zod_1.string)({
        required_error: "email is require",
    }),
});
/**
 * @openapi
 * components:
 *  schemas:
 *    SignInUser:
 *      type: object
 *      required:
 *        - userName
 *        - password
 *      properties:
 *        userName:
 *          type: string
 *          default: 0990576873
 *        password:
 *          type: string
 *          default: 1234
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: string
 *        message:
 *          type: string
 */
exports.signInUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userName: (0, zod_1.string)({
            required_error: "userName is require",
        }),
        // .max(10, "Phone should 10 char")
        // .min(10, "Phone should 10 char"),
        password: (0, zod_1.string)({
            required_error: "Password is require",
        }),
    }),
});
