# FlavorCraft - Premium Ramen Flavor Packets Store

## 🚀 Complete Setup Guide

This is a modern, serverless e-commerce platform for selling ramen flavor packets. Built with Next.js, Supabase, and AWS Lambda.

### ✨ What's Been Improved

1. **🎨 Beautiful Design**: Completely redesigned with modern UI/UX, gradients, animations, and premium styling
2. **📱 Mobile-First**: Fully responsive design that works perfectly on all devices
3. **⚡ Performance**: Optimized images, lazy loading, and fast serverless architecture
4. **🍜 Clear Messaging**: Updated all content to clearly communicate we sell flavor packets, not noodles
5. **🗄️ Serverless Database**: Replaced MongoDB with Supabase PostgreSQL for better serverless performance
6. **👤 User Management**: Integrated Supabase Auth for secure, scalable user management
7. **🔧 Modern Architecture**: Refactored backend for optimal serverless performance

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

### Backend
- **AWS Lambda** - Serverless functions
- **Supabase** - PostgreSQL database + Authentication
- **Stripe** - Payment processing
- **Serverless Framework** - Deployment

### Database Schema
- **users** - User profiles (extends Supabase auth)
- **products** - Flavor packet catalog
- **orders** - Customer orders
- **order_items** - Order line items

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS CLI configured
- Supabase account
- Stripe account

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Set Up Supabase

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run Database Schema**:
   - Open your Supabase dashboard
   - Go to SQL Editor
   - Copy and run the contents of `backend/supabase-schema.sql`

3. **Configure Authentication**:
   - In Supabase dashboard, go to Authentication > Settings
   - Configure your site URL and redirect URLs
   - Enable email confirmation if desired

### 3. Environment Variables

Create `.env.local` in the root directory:

```bash
# Supabase (Frontend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (Frontend)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# API URL (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Create `.env` in the `backend/` directory:

```bash
# Supabase (Backend)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe (Backend)
STRIPE_SECRET_KEY=your_stripe_secret_key

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Development Setup

```bash
# Start frontend (in root directory)
npm run dev

# Start backend (in another terminal)
npm run backend:dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

## 🚀 Production Deployment

### 1. Deploy Backend to AWS Lambda

```bash
cd backend

# Build the backend
npm run build

# Deploy to AWS (make sure AWS CLI is configured)
npm run deploy
```

### 2. Deploy Frontend

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### Option B: Netlify

```bash
# Build the frontend
npm run build

# Deploy to Netlify (drag and drop the out/ folder)
```

#### Option C: AWS S3 + CloudFront

```bash
# Build for static export
npm run build

# Upload the out/ folder to S3 and configure CloudFront
```

### 3. Update Environment Variables

Update your production environment variables:

```bash
# Frontend (.env.local or deployment platform)
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.amazonaws.com/dev/api

# Backend (AWS Lambda environment variables)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔧 Configuration

### Supabase Row Level Security (RLS)

The database schema includes comprehensive RLS policies:

- **Users**: Can read/update their own profile
- **Products**: Public read access, admin-only write access
- **Orders**: Users can only see their own orders
- **Admin Access**: Admin users can manage all data

### Authentication Flow

1. **Sign Up**: Users register with email/password
2. **Email Verification**: Optional email confirmation
3. **Profile Creation**: Automatic profile creation via database trigger
4. **JWT Tokens**: Supabase handles JWT token management
5. **Role-Based Access**: Customer vs Admin roles

### Stripe Integration

1. **Payment Intent**: Created on order submission
2. **Webhook Handling**: Process payment confirmations
3. **Order Status**: Automatically updated on payment success

## 📱 Features

### Customer Features
- ✅ Browse flavor packets by category
- ✅ Search and filter products
- ✅ Add to cart with quantity management
- ✅ Secure checkout with Stripe
- ✅ Order history and tracking
- ✅ User profile management
- ✅ Responsive mobile design

### Admin Features
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ User management
- ✅ Analytics dashboard
- ✅ Inventory tracking

### Technical Features
- ✅ Serverless architecture
- ✅ Real-time updates with Supabase
- ✅ Optimized images and performance
- ✅ SEO optimization
- ✅ Security best practices
- ✅ Error handling and logging

## 🎨 Design System

### Colors
- **Primary**: Red-orange gradient (#ff6b6b to #ff8e53)
- **Secondary**: Orange (#ff8e53)
- **Accent**: Pink-purple gradient (#f093fb to #f5576c)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Display**: Playfair Display (headings)
- **Body**: Inter (body text)
- **Weights**: 300-900 available

### Components
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Soft shadows with hover lift animations
- **Forms**: Clean inputs with focus states
- **Navigation**: Smooth transitions and active states

## 🔍 SEO & Performance

### Optimizations Applied
- ✅ Next.js Image optimization
- ✅ Lazy loading for images
- ✅ Code splitting and tree shaking
- ✅ Compressed assets
- ✅ Meta tags and structured data
- ✅ Sitemap generation
- ✅ Fast loading times (<2s)

### SEO Features
- ✅ Semantic HTML structure
- ✅ Open Graph tags
- ✅ JSON-LD structured data
- ✅ Mobile-first indexing ready
- ✅ Core Web Vitals optimized

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
npm test
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Product Endpoints
- `GET /api/products` - List all products
- `GET /api/products/featured` - Featured products
- `GET /api/products/:id` - Single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Endpoints
- `GET /api/orders` - User's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Single order
- `PUT /api/orders/:id` - Update order status (Admin)

## 🔐 Security

### Implemented Security Measures
- ✅ Row Level Security (RLS) in Supabase
- ✅ JWT token authentication
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ SQL injection protection
- ✅ XSS protection headers
- ✅ Rate limiting (via API Gateway)

## 📊 Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Performance**: Vercel Analytics
- **Uptime**: Pingdom or UptimeRobot
- **Database**: Supabase built-in monitoring

## 🆘 Troubleshooting

### Common Issues

1. **Supabase Connection Errors**:
   - Check environment variables
   - Verify project URL and keys
   - Check RLS policies

2. **Authentication Issues**:
   - Verify redirect URLs in Supabase
   - Check CORS settings
   - Ensure JWT tokens are valid

3. **Deployment Errors**:
   - Check AWS credentials
   - Verify serverless.yml configuration
   - Check environment variables

4. **Performance Issues**:
   - Enable Next.js Image optimization
   - Check database query performance
   - Verify CDN configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for commercial purposes.

## 🎯 Next Steps

### Recommended Enhancements
1. **Inventory Management**: Real-time stock tracking
2. **Reviews & Ratings**: Customer product reviews
3. **Subscription Service**: Monthly flavor packet boxes
4. **Mobile App**: React Native companion app
5. **AI Recommendations**: Personalized flavor suggestions
6. **Loyalty Program**: Points and rewards system
7. **Multi-language**: Internationalization support
8. **Advanced Analytics**: Customer behavior tracking

---

## 📞 Support

If you need help with setup or have questions:

1. Check this documentation first
2. Review the code comments
3. Check the GitHub issues
4. Create a new issue with detailed information

**Happy coding! 🍜✨**