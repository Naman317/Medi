const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatus,
} = require("../controllers/adminC");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();


router.get("/getAllUsers", authMiddleware, getAllUsersController);


router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

router.post("/changeAccountStatus",authMiddleware, changeAccountStatus);
module.exports = router;