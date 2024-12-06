import express from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
  userLogin,
  userSignup,
} from "../controllers";
import { authenticate, validate } from "../middleware";
import { loginSchema, userSchema } from "../validations";

const router = express.Router();

router.post("/signup", validate(userSchema), userSignup);
router.post("/login", validate(loginSchema), userLogin);

// router.use(authenticate);
router.get("/:id?", getUsers);
// router.get("/count", numberOfAllUsers);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as UserRoute };
