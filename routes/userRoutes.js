const express=require('express');
const { loginControl, registerControl, authC,
      applyDoctorController } = require('../controllers/userC');
const auth = require('../middlewares/auth');

const router=express.Router();

router.post('/login',loginControl)

router.post('/register',registerControl)

router.post('/getU',auth,authC); 

router.post("/apply-doctor", auth, applyDoctorController);


module.exports=router