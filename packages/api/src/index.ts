import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { companiesRouter } from './routes/companies.js';
import { agentsRouter } from './routes/agents.js';
import { marketplaceRouter } from './routes/marketplace.js';
import { healthCheck } from './middleware/health.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', healthCheck);
app.use('/api/companies', companiesRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/marketplace', marketplaceRouter);

app.listen(PORT, () => {
  console.log(`🚀 AgentForge API running on port ${PORT}`);
});
