import express, { Request, Response } from 'express'
import { ProductStore, Product} from '../models/product'
import { verifyToken } from '../middleware';

const store = new ProductStore()

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
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await store.create(product)
        console.log(newProduct)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(`Could not add new Product`)
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

const findcategory = async (req: Request, res: Response) => {
    try {
      const category = await store.Productsbycategory(req.params.category)
    res.json(category)  
    } catch (error) {
        res.status(400)
        res.json(`Could not find Product by category`)
    }
    
}

  const ProductRoutes = (app: express.Application) => {
    app.get('/product', index)
    app.get('/product/:id', show)
    app.get('/product/category/:category',verifyToken, findcategory)
    app.post('/product',verifyToken, create)
    app.delete('/product/:id',verifyToken, destroy)
  }
  
  export default ProductRoutes