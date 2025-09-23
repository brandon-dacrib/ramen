"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
exports.default = {
    async fetch(request, env, ctx) {
        process.env.MONGODB_URI = env.MONGODB_URI;
        process.env.JWT_SECRET = env.JWT_SECRET;
        process.env.STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
        process.env.STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
        process.env.NODE_ENV = env.NODE_ENV || 'production';
        const url = new URL(request.url);
        const method = request.method;
        const headers = Object.fromEntries(request.headers.entries());
        let body = null;
        if (method !== 'GET' && method !== 'HEAD') {
            body = await request.text();
        }
        const req = {
            method,
            url: url.pathname + url.search,
            headers,
            body,
        };
        return new Promise((resolve) => {
            const mockRes = {
                statusCode: 200,
                headers: {},
                body: '',
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                json: function (data) {
                    this.headers['Content-Type'] = 'application/json';
                    this.body = JSON.stringify(data);
                    resolve(new Response(this.body, {
                        status: this.statusCode,
                        headers: this.headers,
                    }));
                },
                send: function (data) {
                    this.body = data;
                    resolve(new Response(this.body, {
                        status: this.statusCode,
                        headers: this.headers,
                    }));
                },
                set: function (key, value) {
                    this.headers[key] = value;
                },
            };
            try {
                app_1.default(req, mockRes);
            }
            catch (error) {
                resolve(new Response('Internal Server Error', { status: 500 }));
            }
        });
    },
};
//# sourceMappingURL=worker.js.map