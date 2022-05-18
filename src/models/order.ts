import Client from '../database';

export type Order = {
    id?: string|number;
    users_id: string|number;
    products_id: string|number;
    status_of_orders: 'active'|'complete',
    quantity: number,
}

export class OrderStore {
    async index(): Promise<string | Order[]> {
      try {

        const conn = await Client.connect()
        const sql = 'SELECT * FROM orders'
  
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
    async show(id: string): Promise<string | Order>{
        try {

        const sql = 'SELECT * FROM orders WHERE id=($1) '
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

      async CurrentOrderbyuser(id: string): Promise<string | Order[]>{
        try {
        const sql = "SELECT * FROM orders WHERE users_id=($1) AND status_of_orders='active'"

        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        if (!result.rows.length) {
            return `Could not find order ${id}`
        } else {
            return result.rows}
        }catch(err){
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }

      async CompletedOrdersbyuser(id: string): Promise<string | Order[]>{
        try {
        const sql = "SELECT * FROM orders WHERE users_id=($1) AND status_of_orders='complete'"

        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        if (!result.rows.length) {
            return `Could not find order ${id}`
        } else {
            return result.rows}
        }catch(err){
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }

      async create(order: Order): Promise<string|Order> {
        try {
            try {
                const sql1 = 'SELECT id FROM products WHERE id=($1)'
                const sql2 = 'SELECT id FROM users WHERE id=($1)'
                const conn = await Client.connect()
                const result1 = await conn.query(sql1, [order.products_id])
                const result2 = await conn.query(sql2, [order.users_id])
                conn.release()
                if (!result2.rows[0]) {
                    return `Could not find user ${order.users_id}`
                }else if (!result1.rows[0]) {
                    return `Could not find product ${order.products_id}`
                }
            } catch (error) {
                throw new Error(`Could not find user ${order.users_id} or products ${order.products_id}. Error: ${error}`)
            }

      const sql = 'INSERT INTO orders (users_id, products_id, status_of_orders,quantity) VALUES($1, $2, $3, $4) RETURNING *'

      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [order.users_id, order.products_id,order.status_of_orders, order.quantity])
  
      const orders = result.rows[0]
  
      conn.release()
      
      return orders
        } catch (err) {
            throw new Error(`Could not add new order ${order.id}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<string | Order> {
        try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
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