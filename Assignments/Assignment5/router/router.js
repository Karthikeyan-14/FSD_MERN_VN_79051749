const control_user=require('../controller/controller')
const express=require('express')
const router=express.Router()

router.get('/get',control_user.getuser)
router.post('/create',control_user.insert)
router.post('/log',control_user.login)
router.post('/register',control_user.reg)
router.put('/update/:name',control_user.update_user)
router.delete('/delete/:name',control_user.delete_user)


module.exports=router