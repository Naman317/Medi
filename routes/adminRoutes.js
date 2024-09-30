const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
} = require("../controllers/adminC");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();


router.get("/getAllUsers", authMiddleware, getAllUsersController);


router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

module.exports = router;