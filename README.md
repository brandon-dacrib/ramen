# 🍜 RamenShop - Serverless E-commerce Platform

A modern, serverless e-commerce website for selling premium ramen noodle packets. Built with cutting-edge technologies and designed for deployment on serverless platforms like AWS Lambda, CloudFlare Workers, and static hosting.

## 🚀 Features

- **Modern Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and React hooks
- **Serverless Backend**: Express.js API designed for AWS Lambda/CloudFlare Workers
- **Authentication**: JWT-based auth system with secure password hashing
- **Payment Processing**: Stripe integration for secure payments
- **Product Management**: Full CRUD operations for products
- **Order Management**: Complete order processing workflow
- **Shopping Cart**: Persistent cart with local storage
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **State Management**: Zustand for client-side state
- **API Integration**: Axios for HTTP requests with interceptors

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **HTTP Client**: Axios
- **Payment**: Stripe React components
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **Payment**: Stripe API
- **Validation**: Joi
- **Security**: Helmet, CORS
- **Serverless**: Serverless Framework, serverless-http

### Deployment Options
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: AWS Lambda, CloudFlare Workers
- **Database**: MongoDB Atlas, AWS DocumentDB

## 📁 Project Structure

```
ramen/
├── app/                    # Next.js app directory
│   ├── cart/              # Shopping cart page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── backend/               # Serverless backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   ├── utils/         # Utilities
│   │   ├── app.ts         # Express app
│   │   ├── index.ts       # Lambda handler
│   │   └── worker.ts      # CloudFlare Workers entry
│   ├── serverless.yml     # Serverless config
│   └── wrangler.toml.example # CF Workers config
├── components/            # React components
├── lib/                   # Client utilities
├── types/                 # TypeScript types
└── styles/               # Global styles
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account
- Git

### 1. Clone and Install

```bash
git clone <repository-url>
cd ramen

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### 2. Environment Setup

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

**Backend (.env):**
```bash
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ramen
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CORS_ORIGIN=http://localhost:3000
PORT=3001
```

### 3. Database Setup

```bash
# Start MongoDB locally or use MongoDB Atlas
cd backend
npm run seed  # Populate with sample data
```

### 4. Development

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

Visit `http://localhost:3000` for the frontend and `http://localhost:3001/api` for the API.

## 📦 Deployment

### Frontend Deployment (Static Export)

```bash
npm run build
# Deploy 'out' directory to:
# - Vercel: automatic deployment
# - Netlify: drag & drop or CLI
# - AWS S3: aws s3 sync out/ s3://your-bucket
```

### Backend Deployment

#### AWS Lambda (Serverless Framework)
```bash
cd backend
npm run build
serverless deploy
```

#### CloudFlare Workers
```bash
cd backend
npm run build
# Set secrets: wrangler secret put MONGODB_URI
# Deploy: wrangler publish
```

## 🔐 Authentication

The system includes:
- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes and middleware
- Role-based access (customer/admin)

**Default Users (after seeding):**
- Admin: `admin@ramenshop.com` / `admin123`
- Customer: `customer@test.com` / `customer123`

## 💳 Payment Integration

Stripe integration includes:
- Payment intent creation
- Secure card processing
- Webhook handling
- Order status updates
- Error handling

## 🛡️ Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Helmet security headers
- Input validation with Joi
- SQL injection protection (NoSQL)
- Rate limiting ready

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update status (admin)

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
npm test
```

## 🔧 Configuration

### Environment Variables

See `.env.example` files for all required environment variables.

### Stripe Configuration

1. Create Stripe account
2. Get API keys from dashboard
3. Set up webhook endpoints
4. Configure payment methods

### MongoDB Configuration

1. Local: Install and run MongoDB
2. Atlas: Create cluster and get connection string
3. Set MONGODB_URI in environment

## 📈 Performance

- **Frontend**: Static generation with Next.js
- **Backend**: Serverless functions with cold start optimization
- **Database**: MongoDB with proper indexing
- **CDN**: Static assets served from CDN
- **Caching**: Client-side state persistence

## 🚀 Scaling

- **Horizontal**: Serverless functions auto-scale
- **Database**: MongoDB Atlas auto-scaling
- **CDN**: Global content delivery
- **Load Balancing**: Built into serverless platforms

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For support, please open an issue or contact the development team.

---

Built with ❤️ for ramen lovers worldwide! 🍜
