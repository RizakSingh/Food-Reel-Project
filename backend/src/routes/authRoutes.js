const express = require ('express')
const router = express.Router()
const authController = require ('../controllers/authController')



router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get ('/user/logout',authController.logoutUser)
router.post('/partner/register',authController.registerFoodPartner)
router.post('/partner/login',authController.loginFoodPartner)
router.get('/partner/logout',authController.logoutFoodPartner)
module.exports = router 