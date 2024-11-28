import express from "express";
import { CreateUser, GetUserById, GetUsers } from "../controllers";

const router = express.Router();

router.post("/CreateUser", CreateUser);
router.get("/GetUsers", GetUsers);
router.get("/GetUserById/:id", GetUserById);

export { router as AdminRoute };
