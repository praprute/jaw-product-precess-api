import { object, string } from "zod";

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

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is require",
    }),
    password: string({
      required_error: "Password is require",
    }),
    phone: string({
      required_error: "Phone is require",
    })
      .max(10, "Phone should 10 char")
      .min(10, "Phone should 10 char"),
    email: string({
      required_error: "email is require",
    }),
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

export const signInUserSchema = object({
  body: object({
    userName: string({
      required_error: "userName is require",
    }),
    // .max(10, "Phone should 10 char")
    // .min(10, "Phone should 10 char"),
    password: string({
      required_error: "Password is require",
    }),
  }),
});
