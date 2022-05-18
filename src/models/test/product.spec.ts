import { ProductStore, Product} from '../product';
import supertest from 'supertest';
import app from '../../server';

const store = new ProductStore()

const request = supertest(app);
describe('Testing the endpoint api', function (): void {
    it('endpoint product index', async function (done) {
        const response = await request.get('/product');
        expect(response.status).toBe(200);
        done();
    });
    it('endpoint product show', async function (done) {
      const response = await request.get('/product/1');
      expect(response.status).toBe(200);
      done();
  });
      it('endpoint product category', async function (done) {
        const response = await request.get('/product/category/pc').set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI')
        expect(response.status).toBe(200);
        done();
    });
    it('endpoint product post', async function (done) {
      const response = await request.post('/product').send({name: 'pc2',category: 'pc',price: 300,}).set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI')
      expect(response.status).toBe(200);
      done();
  });
  it('endpoint product delete', async function (done) {
    const response = await request.delete('/product/10').set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI')
    expect(response.status).toBe(200);
    done();
});
    it('endpoint for main page', async function (done) {
      const response = await request.get('/');
      expect(response.status).toBe(200);
      done();
  });
  });
describe("Product Model", () => {
  
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
    it('should have an show method', () => {
      expect(store.show).toBeDefined();
    }); 
    it('should have an create method', () => {
      expect(store.create).toBeDefined();
    }); 
    it('should have an category method', () => {
      expect(store.Productsbycategory).toBeDefined();
    });
    it('should have an delete method', () => {
      expect(store.delete).toBeDefined();
    });

    it('create method should add a book', async () => {
      const result = await store.create({
        name: 'pc v3',
        category: 'pc',
        price: 300,
      });
      expect(result).toEqual({
        id : 3,
        name: 'pc v3',
        category: 'pc',
        price: 300,
      });
    });

    it('index method should return a list of books', async () => {
      const result = await store.index();
      expect(result).toEqual([
        {id : 1,
        name: 'pants',
        category: 'cloths',
        price: 300,
      },{
        id : 2,
        name: 'pc2',
        category: 'pc',
        price: 300,
      },{
        id : 3,
        name: 'pc v3',
        category: 'pc',
        price: 300
      }]);
    }); 

    it('show method should return the correct Products', async () => {
      const result = await store.show('2');
      expect(result).toEqual({
        id : 2,
        name: 'pc2',
        category: 'pc',
        price: 300,
      });
    });

    it('category method should return the correct Products', async () => {
      const result = await store.Productsbycategory('pc');
      expect(result).toEqual([{
        id : 2,
        name: 'pc2',
        category: 'pc',
        price: 300,
      },{
        id : 3,
        name: 'pc v3',
        category: 'pc',
        price: 300
      }]);
    });

    it('delete method should remove the book', async () => {
      
      const result = await store.delete('3');
    
      expect(result).toEqual({
        id : 3,
        name: 'pc v3',
        category: 'pc',
        price: 300,
      });
    });
})
