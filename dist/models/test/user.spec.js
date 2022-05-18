"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const store = new user_1.UserStore();
const request = (0, supertest_1.default)(server_1.default);
describe("User Model", () => {
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
    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('create method should add a book', async () => {
        const result = await store.create({
            firstname: 'testy',
            lastname: 'testy',
            password: '123',
        });
        expect(result).toEqual({
            id: 2,
            firstname: 'testy',
            lastname: 'testy',
        });
    });
    it('create method should add a book', async () => {
        const result = await store.authenticate('testy', '123');
        expect(result).toEqual({
            id: 2,
            firstname: 'testy',
            lastname: 'testy',
        });
    });
    it('index method should return a list of books', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                firstname: 'test',
                lastname: 'testy',
            },
            {
                id: 2,
                firstname: 'testy',
                lastname: 'testy',
            }]);
    });
    it('show method should return the correct book', async () => {
        const result = await store.show('2');
        expect(result).toEqual({
            id: 2,
            firstname: 'testy',
            lastname: 'testy',
        });
    });
    it('delete method should remove the book', async () => {
        const result = await store.delete('2');
        expect(result).toEqual({
            id: 2,
            firstname: 'testy',
            lastname: 'testy',
        });
    });
    describe('Testing the endpoint api', function () {
        it('endpoint user index', async function (done) {
            const response = await request.get('/user').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint user show', async function (done) {
            const response = await request.get('/user/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint user signup', async function (done) {
            const response = await request.post('/user/signup').send({
                firstname: 'tes',
                lastname: 'testy',
                password: '123',
            });
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint user login', async function (done) {
            const response = await request.post('/user/login').send({
                firstname: 'tes',
                password: '123',
            });
            expect(response.status).toBe(200);
            done();
        });
        it('endpoint user delete', async function (done) {
            const response = await request.delete('/user/2').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0eSJ9LCJpYXQiOjE2NTIyNjg5NTZ9.VNpmkQJdtUQU5blY6UehwFqzSkSjOIejwxQeDk6b1GI');
            expect(response.status).toBe(200);
            done();
        });
    });
});
