import express from 'express'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from '../controllers/productController.js'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'
import { multipleUpload } from '../middleware/multer.js'
 
const router = express.Router()

router.post('/add',isAuthenticated,multipleUpload,addProduct)//api-path,authentication,role(isAdmin),typeofupload,controller
router.get('/getallproducts',getAllProduct)
router.delete('/delete/:productId',isAuthenticated,deleteProduct)//api-path,authentication,role(isAdmin),controller
router.put('/update/:productId',isAuthenticated,multipleUpload,updateProduct)//api-path,authentication,role(isAdmin),typeofupload,controller
export default router