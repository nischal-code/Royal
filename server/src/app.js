import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import plannerRoutes from './routes/plannerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins.length ? allowedOrigins : true,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Basic abuse protection on the public form endpoints.
  const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: 'Too many submissions from this device — please try again later.' },
  });

  app.get('/api/health', (req, res) => res.json({ ok: true, service: 'royal-wedding-server' }));

  app.use('/api/contact', formLimiter, contactRoutes);
  app.use('/api/planner', formLimiter, plannerRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
