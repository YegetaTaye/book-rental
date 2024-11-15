const router = require("express").Router();

const {addUser, getAllUsers, getUserById, deleteUserByEmail, login, numberOfAllUsers} = require("./userController");
const auth = require("../../api/middleware/auth");

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/count", numberOfAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserByEmail);
router.post("/login", login);

module.exports = router;
