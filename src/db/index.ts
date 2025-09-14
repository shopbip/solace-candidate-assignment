import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Validate required environment variables
const validateEnvironment = () => {
  const requiredVars = ['DATABASE_URL'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

const setup = () => {
  validateEnvironment();

  // Configure connection with proper pooling and SSL
  const queryClient = postgres(process.env.DATABASE_URL!, {
    max: 20, // Maximum number of connections in the pool
    idle_timeout: 20, // Close idle connections after 20 seconds
    connect_timeout: 10, // Connection timeout in seconds
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
    prepare: false, // Disable prepared statements for better compatibility
  });
  
  const db = drizzle(queryClient);
  
  // Add graceful shutdown handling
  const gracefulShutdown = async () => {
    console.log('Closing database connections...');
    await queryClient.end();
    console.log('Database connections closed');
  };
  
  // Handle process termination
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  
  return db;
};

export default setup();
