const router = require("express").Router();

const {addUser, getAllUsers, getUserById, deleteUserByEmail, login} = require("./userController");
const auth = require("../../api/middleware/auth");

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:id", auth, getUserById);
router.delete("/:email", deleteUserByEmail);
router.post("/login", login);

module.exports = router;
