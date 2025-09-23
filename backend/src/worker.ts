// CloudFlare Workers entry point
import app from './app';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // Set environment variables from CloudFlare Workers env
    process.env.MONGODB_URI = env.MONGODB_URI;
    process.env.JWT_SECRET = env.JWT_SECRET;
    process.env.STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
    process.env.STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
    process.env.NODE_ENV = env.NODE_ENV || 'production';
    
    // Convert CloudFlare Workers Request to Node.js compatible request
    const url = new URL(request.url);
    const method = request.method;
    const headers = Object.fromEntries(request.headers.entries());
    
    let body = null;
    if (method !== 'GET' && method !== 'HEAD') {
      body = await request.text();
    }

    // Create a mock Express-compatible request/response
    const req = {
      method,
      url: url.pathname + url.search,
      headers,
      body,
    };

    // Handle the request with Express app
    return new Promise((resolve) => {
      const mockRes = {
        statusCode: 200,
        headers: {} as Record<string, string>,
        body: '',
        status: function(code: number) {
          this.statusCode = code;
          return this;
        },
        json: function(data: any) {
          this.headers['Content-Type'] = 'application/json';
          this.body = JSON.stringify(data);
          resolve(new Response(this.body, {
            status: this.statusCode,
            headers: this.headers,
          }));
        },
        send: function(data: any) {
          this.body = data;
          resolve(new Response(this.body, {
            status: this.statusCode,
            headers: this.headers,
          }));
        },
        set: function(key: string, value: string) {
          this.headers[key] = value;
        },
      };

      // This is a simplified adapter - for production use, consider using a proper adapter
      try {
        (app as any)(req, mockRes);
      } catch (error) {
        resolve(new Response('Internal Server Error', { status: 500 }));
      }
    });
  },
};