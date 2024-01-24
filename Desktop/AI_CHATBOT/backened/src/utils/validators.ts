 import { Request, Response,NextFunction } from "express";
import { body , ValidationChain, validationResult} from "express-validator";


export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);

            if (!result.isEmpty()) {
                // If any validation fails, break out of the loop
                break;
            }
        }

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            // If there are no validation errors, proceed to the next middleware
            return next();
        }

        // If there are validation errors, return a 422 Unprocessable Entity response
        return res.status(422).json({ errors: errors.array() });
    };
};

export const loginVallidator =[
   
     // Validation for the 'email' field
    body("email").trim().isEmail().withMessage("email is required"),
    // Validation for the 'password' field
    body("password")
    .trim()
    .isLength({ min:6})
    .withMessage("password should contain at least 6 characters"),
];







export const signupVallidator =[
    // Validation for the 'name' field
    body("name").notEmpty().withMessage("name is required"),
    ...loginVallidator,
    //  // Validation for the 'email' field
    // body("email").trim().isEmail().withMessage("email is required"),
    // // Validation for the 'password' field
    // body("password")
    // .trim()
    // .isLength({ min:6})
    // .withMessage("password should contain at least 6 characters"),
];