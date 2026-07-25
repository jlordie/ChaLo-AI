import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'express-cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { AppDataSource } from './database/data-source';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import chatRoutes from './routes/chat.routes';
import adminRoutes from './routes/admin.routes';
import apiRoutes from './routes/api.routes';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import logger from './utils/logger';

const app: Express = express();
const PORT = process.env.API_PORT || 8000;

// Initialize HTTP Server with Socket.io
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(requestLogger);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1', apiRoutes);

// API Documentation
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'ChaLo AI API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      chat: '/api/v1/chat',
      admin: '/api/v1/admin',
    },
  });
});

// Error Handler
app.use(errorHandler);

// Socket.io Events
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });

  socket.on('chat:message', (data) => {
    io.emit('chat:message', { socketId: socket.id, ...data });
  });
});

// Initialize Database & Start Server
async function bootstrap() {
  try {
    await AppDataSource.initialize();
    logger.info('Database connected');

    httpServer.listen(PORT, () => {
      logger.info(`✅ Server running on http://localhost:${PORT}`);
      logger.info(`📚 API Docs: http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

export { app, io };
