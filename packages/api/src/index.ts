import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { companiesRouter } from './routes/companies.js';
import { agentsRouter } from './routes/agents.js';
import { marketplaceRouter } from './routes/marketplace.js';
import { paperclipRouter } from './routes/paperclip.js';
import { healthCheck } from './middleware/health.js';

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions: cors.CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
};

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));
app.use(cors(corsOptions));
app.use(express.json());

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.get('/health', healthCheck);
app.use('/api/companies', companiesRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/marketplace', marketplaceRouter);
app.use('/api/paperclip', paperclipRouter);

app.listen(PORT, () => {
  console.log(`🚀 AgentForge API running on port ${PORT}`);
});
