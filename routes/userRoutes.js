const express=require('express');
const { loginControl, registerControl, authC } = require('../controllers/userC');
const auth = require('../middlewares/auth');

const router=express.Router();

router.post('/login',loginControl)

router.post('/register',registerControl)

router.post('/getU',auth,authC); 

module.exports=router