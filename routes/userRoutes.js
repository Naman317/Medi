const express=require('express');
const { loginControl, registerControl, authC,
     applyDoctorController,getAllNotificationController,
     deleteAllNotificationController } = require('../controllers/userC');
const auth = require('../middlewares/auth');

const router=express.Router();

router.post('/login',loginControl)

router.post('/register',registerControl)

router.post('/getU',auth,authC); 

router.post("/apply-doctor", auth, applyDoctorController);

router.post("/get-all-notification", auth, getAllNotificationController);

router.post("/delete-all-notification", auth, deleteAllNotificationController);
module.exports=router