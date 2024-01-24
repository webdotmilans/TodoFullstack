import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUser = async (req, res, next) => {
    //get all users from database
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        // User signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        // Hash the password
        const hashedPassword = await hash(password, 10);
        // Create a new User instance and save to the database
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        // after password correct we create new token here
        const token = createToken(user.id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //to send the cookie from fronted to backened we use response
        // res.cookie("auth_token", token , { path: "/" , domain:"localhost",expires:""
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // Respond with a success message and the user's ID
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        // Handle any errors during user creation or saving
        console.error(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
        // Find the user based on the provided email
        const user = await User.findOne({ email });
        // If the user is not found, return a 401 Unauthorized response
        if (!user) {
            return res.status(401).send("User not registered");
        }
        // Check if the provided password matches the stored hashed password
        const isPasswordCorrect = await compare(password, user.password);
        // If the password is incorrect, return a 403 Forbidden response
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        // after password correct we create new token here
        const token = createToken(user.id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //to send the cookie from fronted to backened we use response
        // res.cookie("auth_token", token , { path: "/" , domain:"localhost",expires:""
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // If login is successful, return a 201 Created response with user information
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        // Handle any errors that occur during the login process
        console.error(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map