import express, { Request, Response } from 'express'
import { OrderStore, Order} from '../models/order'
import { verifyToken } from '../middleware';

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
try {
    const order = await store.index()
    res.json(order)
} catch (error) {
    res.status(400)
    res.json(`Could not find Orders`)
}
}

  
const show = async (req: Request, res: Response) => {
    try { 
    const order = await store.show(req.params.id)
     res.json(order)
    } catch (error) {
        res.status(400)
        res.json(`Could not find Order ${req.params.id}`)
    }
  }

  const Current = async (req: Request, res: Response) => {
    try {
    const order = await store.CurrentOrderbyuser(req.params.id)
    res.json(order)
} catch (error) {
    res.status(400)
    res.json(`Could not find Current Orders`)
}
  }
  const Completed = async (req: Request, res: Response) => {
    try {
    const order = await store.CompletedOrdersbyuser(req.params.id)
    res.json(order)
} catch (error) {
    res.status(400)
    res.json(`Could not find Completed Orders`)
}
 }
 const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            users_id: req.body.users_id,
            products_id: req.body.products_id,
            status_of_orders: req.body.status_of_orders,
            quantity: req.body.quantity,
            
        }

        const newOrder = await store.create(order)
        console.log(newOrder)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(`Could not add new Order`)
    }
}
const destroy = async (req: Request, res: Response) => {
    try {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
} catch (error) {
    res.status(400)
    res.json(`Could not delete Order ${req.params.id}`)
}
}

 const OrderRoutes = (app: express.Application) => {
    app.get('/order',verifyToken, index)
    app.get('/order/:id',verifyToken, show)
    app.get('/order/current/:id',verifyToken, Current)
    app.get('/order/completed/:id',verifyToken, Completed)
    app.post('/order',verifyToken, create)
    app.delete('/order/:id',verifyToken, destroy)
  }
  
  export default OrderRoutes