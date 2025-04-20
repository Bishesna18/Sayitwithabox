import express from 'express'
import {placeOrder,placeOrderStripe,allOrder,userOrders,updateStatus, verifyStripe} from '../controller/orderController.js'
import authUser from '../middleware/auth.js'
const orderRouter=express.Router()
orderRouter.post('/list',allOrder)
orderRouter.post('/status',updateStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
//user feature
orderRouter.post('/userorders',authUser,userOrders)
//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter