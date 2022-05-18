import { OrderproductStore} from '../orderproduct';
import supertest from 'supertest';
import app from '../../server';

const opstore = new OrderproductStore()

const request = supertest(app);
describe("orderproduct Model", () => {
    it('should have an index method', () => {
      expect(opstore.index).toBeDefined();
    });
    it('should have an show method', () => {
      expect(opstore.show).toBeDefined();
    }); 
    it('should have an create method', () => {
      expect(opstore.create).toBeDefined();
    }); 
    it('should have an delete method', () => {
      expect(opstore.delete).toBeDefined();
    });
    it('create method should add orderproduct', async () => {
        const result = await opstore.create({
            order_id: 1,
            products_id: 1,
            quantity: 30,
        });
        const result1 = await opstore.create({
            order_id: 1,
            products_id: 1,
            quantity: 10,
        });
        
        expect(result).toEqual({
          id : 1,
          order_id: 1,
          products_id: 1,
          quantity: 30,
        });
        expect(result1).toEqual({
            id : 2,
            order_id: 1,
            products_id: 1,
            quantity: 10,
          });
      });
  
      it('index method should return a list of orderproduct', async () => {
        const result = await opstore.index();
        expect(result).toEqual([{
          id : 1,
          order_id: 1,
          products_id: 1,
          quantity: 30,
        }
        ,
        {
            id : 2,
            order_id: 1,
            products_id: 1,
            quantity: 10,
        }
    ]);
      }); 
  
      it('show method should return the correct orderproduct', async () => {
        const result = await opstore.show('1');
        expect(result).toEqual({
          id : 1,
          order_id: 1,
          products_id: 1,
          quantity: 30,
        });
      });
  
      it('delete method should remove the orderproduct', async () => {
        
        const result = await opstore.delete('1');
      
        expect(result).toEqual({
          id : 1,
          order_id: 1,
          products_id: 1,
          quantity: 30,
        });
      });
      describe('Testing the endpoint api', function (): void {
        it('endpoint orderproduct index', async function (done) {
            const response = await request.get('/orderproduct').set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI')
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint orderproduct show', async function (done) {
          const response = await request.get('/orderproduct/1').set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI')
          expect(response.status).toBe(200);
          done();
      });
        it('endpoint orderproduct post', async function (done) {
          const response = await request.post('/orderproduct').send({ 
            order_id: 1,
            products_id: 1,
            quantity: 30,})
            .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI')
          expect(response.status).toBe(200);
          done();
      });
      
      it('endpoint orderproduct delete', async function (done) {
        const response = await request.delete('/orderproduct/2').set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI')
        expect(response.status).toBe(200);
        done();
    });
        
      });
})