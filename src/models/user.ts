import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config()


export type User = {
    id?: string|number;
    firstname: string;
    lastname: string;
    password?: string;
}

const{
    pepper,
    saltRounds
} = process.env

export class UserStore {
    async index(): Promise<string | User[]> {
        try {
  
          const conn = await Client.connect()
          const sql = 'SELECT id,firstName,lastName FROM users'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          if (!result.rows[0]) {
              return `Could not find User`
          } else {
              return result.rows}
              
        } catch (err) {
          throw new Error(`Could not get User. Error: ${err}`)
        }
      }
      async show(id: string): Promise<string | User>{
          try {
  
          const sql = 'SELECT id,firstName,lastName FROM users WHERE id=($1) '
          const conn = await Client.connect()
      
          const result = await conn.query(sql, [id])
      
          conn.release()
  
          if (!result.rows[0]) {
              return `Could not find user ${id}`
          } else {
              return result.rows[0]}
  
          } catch (err) {
              throw new Error(`Could not find user ${id}. Error: ${err}`)
          }
          
        }

        async create(user: User): Promise<User> {
            try {
          const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING id,firstName,lastName'
    
          const conn = await Client.connect()

          const hash = bcrypt.hashSync(
            user.password as string + pepper, 
            Number(saltRounds)
          );  

          const result = await conn
              .query(sql, [user.firstname, user.lastname, hash])
      
          const users = result.rows[0]
      
          conn.release()
          
          return users
            } catch (err) {
                throw new Error(`Could not add new user ${user.firstname}. Error: ${err}`)
            }
        }

        async authenticate(firstName: string, password: string): Promise<User | null> {

            const conn = await Client.connect()

            const sql = 'SELECT * FROM users WHERE firstName=($1)'
        
            const result = await conn.query(sql, [firstName])
        
            // console.log(password+pepper)
        
            if(result.rows.length) {
        
              const user = result.rows[0]
        
              // console.log(user)
        
              if (bcrypt.compareSync(password+pepper, user.password)) {
                const users = {
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                }
                return users
              }
            }
        
            return null
          }


          async delete(id: string): Promise<string | User> {
            try {
              try {
                const sql1 = 'SELECT id FROM orders WHERE users_id=($1)'
                const conn = await Client.connect()
                const result1 = await conn.query(sql1, [id])
                conn.release()
    
                if (result1.rows[0]) {
                    return `Could not delete User ${id} because it is insided order table`
                }
            } catch (error) {
                throw new Error(`Could not delete User ${id} because it is insided order table. Error: ${error}`)
            }
    
          const sql = 'DELETE FROM users WHERE id=($1) RETURNING id,firstName,lastName'
         
          const conn = await Client.connect()
      
          const result = await conn.query(sql, [id])
      
          const users = result.rows[0]
      
          conn.release()
    
            if (!users) {
                return `Could not delete user ${id}`
             } else {
                return users}
    
            } catch (err) {
                throw new Error(`Could not delete user ${id}. Error: ${err}`)
            }
        }
}