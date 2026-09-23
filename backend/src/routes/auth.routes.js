const express = require("express");

const {register, login, getCurrentUser,} = require("../controllers/auth.controller");

const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});
router.get("/me", authenticate, getCurrentUser);

module.exports = router;