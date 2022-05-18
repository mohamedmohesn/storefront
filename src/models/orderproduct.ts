import Client from '../database';

export type Orderproduct = {
    id?: string|number;
    order_id: string|number;
    products_id: string|number;
    quantity: number,
}

export class OrderproductStore {
    async index(): Promise<string | Orderproduct[]> {
      try {

        const conn = await Client.connect()
        const sql = 'SELECT * FROM order_products'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        if (!result.rows[0]) {
            return `Could not find order`
        } else {
            return result.rows}
            
      } catch (err) {
        throw new Error(`Could not get order. Error: ${err}`)
      }
    }
    async show(id: string): Promise<string | Orderproduct>{
        try {

        const sql = 'SELECT * FROM order_products WHERE id=($1) '
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()

        if (!result.rows[0]) {
            return `Could not find order ${id}`
        } else {
            return result.rows[0]}

        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
        
      }

      

      async create(orderproduct: Orderproduct): Promise<string|Orderproduct> {
        try {
            try {
                const sql1 = 'SELECT id FROM products WHERE id=($1)'
                const sql2 = 'SELECT id FROM orders WHERE id=($1)'
                const conn = await Client.connect()
                const result1 = await conn.query(sql1, [orderproduct.products_id])
                const result2 = await conn.query(sql2, [orderproduct.order_id])
                conn.release()
                if (!result2.rows[0]) {
                    return `Could not find user ${orderproduct.order_id}`
                }else if (!result1.rows[0]) {
                    return `Could not find product ${orderproduct.products_id}`
                }
            } catch (error) {
                throw new Error(`Could not find order ${orderproduct.order_id} or products ${orderproduct.products_id}. Error: ${error}`)
            }

      const sql = 'INSERT INTO order_products(order_id, products_id, quantity) VALUES($1, $2, $3) RETURNING *'

      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [orderproduct.order_id, orderproduct.products_id, orderproduct.quantity])
  
      const orders = result.rows[0]
  
      conn.release()
      
      return orders
        } catch (err) {
            throw new Error(`Could not add new order ${orderproduct.id}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<string | Orderproduct> {
        try {
      const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const orders = result.rows[0]
  
      conn.release()

        if (!orders) {
            return `Could not delete orders ${id}`
         } else {
            return orders}

        } catch (err) {
            throw new Error(`Could not delete orders ${id}. Error: ${err}`)
        }
    }
}