import { Router } from "express";
import { getAllUser, userLogin, userSignup } from "../controllers/user-controllers.js";
import { loginVallidator, signupVallidator, validate } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get("/", getAllUser);
userRoutes.post("/signup", validate(signupVallidator), userSignup);
userRoutes.post("/login", validate(loginVallidator), userLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map