import express, { Request, Response } from 'express'
import { UserStore, User} from '../models/user'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyToken } from '../middleware';

dotenv.config()

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    try {
        const Product = await store.index()
    res.json(Product)
    } catch (error) {
        res.status(400)
        res.json(`Could not find Product`)
    }
    
}
  
const show = async (req: Request, res: Response) => {
    try {
      const Product = await store.show(req.params.id)
     res.json(Product)  
    } catch (error) {
        res.status(400)
        res.json(`Could not find Product`)
    } 
    
  }

  const create = async (req: Request, res: Response) => {
    try {
        const product: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        }

        const newProduct = await store.create(product)
        const token = jwt.sign({user: newProduct}, process.env.TOKEN as string);
        res.setHeader('authorization', 'Bearer '+token)
        
        // console.log(token)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(`Could not add new Product`)
    }
}
const authenticate = async (req: Request, res: Response) => {
    try {
        const firstName = req.body.firstName;
        const password = req.body.password;
        
        const newProduct = await store.authenticate(firstName,password)

        if (newProduct !== null) {
        const token = jwt.sign({user: newProduct}, process.env.TOKEN as string);
        res.setHeader('authorization', 'Bearer '+token)  
        }
       
        // console.log(newProduct)
        res.json(newProduct)

    } catch(err) {
        res.status(400)
        res.json(`Could not login new Product`)
    }
}
const destroy = async (req: Request, res: Response) => {
    try {
         const deleted = await store.delete(req.params.id)
    res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json(`Could not delete Product`)
    }
   
}


  const UserRoutes = (app: express.Application) => {
    app.get('/user',verifyToken, index)
    app.get('/user/:id',verifyToken, show)
    app.post('/user/signup', create)
    app.post('/user/login', authenticate)
    app.delete('/user/:id',verifyToken, destroy)
  }
  
  export default UserRoutes