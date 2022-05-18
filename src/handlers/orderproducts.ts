import express, { Request, Response } from 'express'
import { Orderproduct, OrderproductStore} from '../models/orderproduct'
import { verifyToken } from '../middleware';

const store = new OrderproductStore()

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

 const create = async (req: Request, res: Response) => {
    try {
        const order: Orderproduct = {
            order_id: req.body.order_id,
            products_id: req.body.products_id,
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

 const orderproductRoutes = (app: express.Application) => {
    app.get('/orderproduct',verifyToken, index)
    app.get('/orderproduct/:id',verifyToken, show)
    app.post('/orderproduct',verifyToken, create)
    app.delete('/orderproduct/:id',verifyToken, destroy)
  }
  
  export default orderproductRoutes