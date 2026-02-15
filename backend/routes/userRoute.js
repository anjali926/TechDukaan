import express from 'express'
import { register , verify , reVerify, login, logOut, forgotPassword ,verifyOTP , changePassword,allUser, getUserById} from '../controllers/userController.js'
import {isAdmin, isAuthenticated} from '../middleware/isAuthenticated.js'

const router = express.Router()

router.post('/register',register)
router.post('/verify',verify)
router.post('/reverify',reVerify)
router.post('/login',login)
router.post('/logout', isAuthenticated , logOut)
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',verifyOTP)
router.post('/change-password/:email',changePassword)
router.get('/all-users',isAuthenticated, isAdmin ,allUser)
router.get('/get-users/:userId',isAuthenticated,getUserById)

export default router
