import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from './app';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🍜 Ramen backend server running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  });
}

// For serverless deployment (AWS Lambda)
export const handler = serverless(app);