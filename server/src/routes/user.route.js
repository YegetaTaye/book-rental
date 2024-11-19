const router = require("express").Router();
const { validate } = require("../middleware/validate");
const { userSchema, loginSchema } = require("../validations/user.validations");

const {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserByEmail,
  login,
  numberOfAllUsers,
} = require("../controllers");

const auth = require("../middleware/auth");

router.post("/", validate(userSchema), addUser);
router.post("/login", validate(loginSchema), login);
router.get("/", getAllUsers);
router.get("/count", numberOfAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserByEmail);
router.post("/login", login);

const userRouter = router;
module.exports = userRouter;
