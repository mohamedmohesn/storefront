"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const product_1 = require("../product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const store = new order_1.OrderStore();
const store1 = new user_1.UserStore();
const store2 = new product_1.ProductStore();
const request = (0, supertest_1.default)(server_1.default);
describe("order Model", () => {
    beforeAll(async function () {
        await store1.create({
            firstname: 'test',
            lastname: 'testy',
            password: '123',
        });
        await store2.create({
            name: 'pants',
            category: 'cloths',
            price: 300,
        });
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have an Current method', () => {
        expect(store.CurrentOrderbyuser).toBeDefined();
    });
    it('should have an Completed method', () => {
        expect(store.CompletedOrdersbyuser).toBeDefined();
    });
    it('create method should add orders', async () => {
        const result = await store.create({
            users_id: 1,
            products_id: 1,
            status_of_orders: 'active',
            quantity: 30,
        });
        const result1 = await store.create({
            users_id: 1,
            products_id: 1,
            status_of_orders: 'complete',
            quantity: 10,
        });
        expect(result).toEqual({
            id: 1,
            users_id: 1,
            products_id: 1,
            status_of_orders: 'active',
            quantity: 30,
        });
        expect(result1).toEqual({
            id: 2,
            users_id: 1,
            products_id: 1,
            status_of_orders: 'complete',
            quantity: 10,
        });
    });
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                users_id: 1,
                products_id: 1,
                status_of_orders: 'active',
                quantity: 30,
            },
            {
                id: 2,
                users_id: 1,
                products_id: 1,
                status_of_orders: 'complete',
                quantity: 10,
            }
        ]);
    });
    it('show method should return the correct order', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            users_id: 1,
            products_id: 1,
            status_of_orders: 'active',
            quantity: 30,
        });
    });
    it('show method should return the correct order', async () => {
        const result = await store.CurrentOrderbyuser('1');
        expect(result).toEqual([{
                id: 1,
                users_id: 1,
                products_id: 1,
                status_of_orders: 'active',
                quantity: 30,
            }]);
    });
    it('show method should return the correct order', async () => {
        const result = await store.CompletedOrdersbyuser('1');
        expect(result).toEqual([{
                id: 2,
                users_id: 1,
                products_id: 1,
                status_of_orders: 'complete',
                quantity: 10,
            }]);
    });
    it('delete method should remove the order', async () => {
        const result = await store.delete('1');
        expect(result).toEqual({
            id: 1,
            users_id: 1,
            products_id: 1,
            status_of_orders: 'active',
            quantity: 30,
        });
    });
    describe('Testing the endpoint api', function () {
        it('endpoint order index', async function (done) {
            const response = await request.get('/order').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint order show', async function (done) {
            const response = await request.get('/order/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint order current', async function (done) {
            const response = await request.get('/order/current/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint order completed', async function (done) {
            const response = await request.get('/order/completed/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint order post', async function (done) {
            const response = await request.post('/order').send({
                users_id: 1,
                products_id: 1,
                status_of_orders: 'active',
                quantity: 30,
            })
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint order delete', async function (done) {
            const response = await request.delete('/order/10').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
    });
});
