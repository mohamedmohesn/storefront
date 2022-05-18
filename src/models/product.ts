import Client from '../database';

export type Product = {
    id?: string|number;
    name: string;
    category?: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<string | Product[]> {
      try {

        const conn = await Client.connect()
        const sql = 'SELECT * FROM products'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        if (!result.rows[0]) {
            return `Could not find products`
        } else {
            return result.rows}
            
      } catch (err) {
        throw new Error(`Could not get product. Error: ${err}`)
      }
    }
    async show(id: string): Promise<string | Product>{
        try {

        const sql = 'SELECT * FROM products WHERE id=($1) '
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()

        if (!result.rows[0]) {
            return `Could not find product ${id}`
        } else {
            return result.rows[0]}

        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
        
      }
      async create(Product: Product): Promise<Product> {
        try {
      const sql = 'INSERT INTO products (name, category, price) VALUES($1, $2, $3) RETURNING *'

      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [Product.name, Product.category, Product.price])
  
      const product = result.rows[0]
  
      conn.release()
      
      return product
        } catch (err) {
            throw new Error(`Could not add new Product ${Product.name}. Error: ${err}`)
        }
    }
    
    async Productsbycategory(category: string): Promise<string | Product[]> {
      try {
    const sql = 'SELECT * FROM products WHERE category=($1)'
   
    const conn = await Client.connect()

    const result = await conn.query(sql, [category])

    const products = result.rows

    conn.release()

      if (!products.length) {
          return `Could not find product category ${category}`
       } else {
          return products}

      } catch (err) {
          throw new Error(`Could not find product category ${category}. Error: ${err}`)
      }
  }

    async delete(id: string): Promise<string | Product> {
        try {
          try {
            const sql1 = 'SELECT id FROM orders WHERE products_id=($1)'
            const conn = await Client.connect()
            const result1 = await conn.query(sql1, [id])
            conn.release()

            if (result1.rows[0]) {
                return `Could not delete product ${id} because it is insided order table`
            }
        } catch (error) {
            throw new Error(`Could not delete product ${id} because it is insided order table. Error: ${error}`)
        }

      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
     
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const products = result.rows[0]
  
      conn.release()

        if (!products) {
            return `Could not delete product ${id}`
         } else {
            return products}

        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

    

  }
