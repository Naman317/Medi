const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorC");
const auth = require("../middlewares/auth");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", auth, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", auth, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDoctorById", auth, getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  auth,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", auth, updateStatusController);

module.exports = router;