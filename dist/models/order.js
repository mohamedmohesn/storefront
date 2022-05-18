"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (!result.rows[0]) {
                            return [2 /*return*/, "Could not find order"];
                        }
                        else {
                            return [2 /*return*/, result.rows];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get order. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders WHERE id=($1) ';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (!result.rows[0]) {
                            return [2 /*return*/, "Could not find order ".concat(id)];
                        }
                        else {
                            return [2 /*return*/, result.rows[0]];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.CurrentOrderbyuser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders WHERE users_id=($1) AND status_of_orders='active'";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (!result.rows.length) {
                            return [2 /*return*/, "Could not find order ".concat(id)];
                        }
                        else {
                            return [2 /*return*/, result.rows];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.CompletedOrdersbyuser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders WHERE users_id=($1) AND status_of_orders='complete'";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (!result.rows.length) {
                            return [2 /*return*/, "Could not find order ".concat(id)];
                        }
                        else {
                            return [2 /*return*/, result.rows];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var sql1, sql2, conn_1, result1, result2, error_1, sql, conn, result, orders, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        sql1 = 'SELECT id FROM products WHERE id=($1)';
                        sql2 = 'SELECT id FROM users WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 2:
                        conn_1 = _a.sent();
                        return [4 /*yield*/, conn_1.query(sql1, [order.products_id])];
                    case 3:
                        result1 = _a.sent();
                        return [4 /*yield*/, conn_1.query(sql2, [order.users_id])];
                    case 4:
                        result2 = _a.sent();
                        conn_1.release();
                        if (!result2.rows[0]) {
                            return [2 /*return*/, "Could not find user ".concat(order.users_id)];
                        }
                        else if (!result1.rows[0]) {
                            return [2 /*return*/, "Could not find product ".concat(order.products_id)];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        throw new Error("Could not find user ".concat(order.users_id, " or products ").concat(order.products_id, ". Error: ").concat(error_1));
                    case 6:
                        sql = 'INSERT INTO orders (users_id, products_id, status_of_orders,quantity) VALUES($1, $2, $3, $4) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 7:
                        conn = _a.sent();
                        return [4 /*yield*/, conn
                                .query(sql, [order.users_id, order.products_id, order.status_of_orders, order.quantity])];
                    case 8:
                        result = _a.sent();
                        orders = result.rows[0];
                        conn.release();
                        return [2 /*return*/, orders];
                    case 9:
                        err_5 = _a.sent();
                        throw new Error("Could not add new order ".concat(order.id, ". Error: ").concat(err_5));
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, orders, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        orders = result.rows[0];
                        conn.release();
                        if (!orders) {
                            return [2 /*return*/, "Could not delete orders ".concat(id)];
                        }
                        else {
                            return [2 /*return*/, orders];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not delete orders ".concat(id, ". Error: ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
