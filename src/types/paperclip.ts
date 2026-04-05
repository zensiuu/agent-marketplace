export type AgentStatus = 'active' | 'paused' | 'terminated' | 'idle' | 'running' | 'error';
export type IssueStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';
export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';
export type AdapterType = 'claude_local' | 'codex_local' | 'openclaw_gateway' | 'http' | 'process';

export interface Agent {
  id: string;
  name: string;
  role: string;
  title?: string;
  status: AgentStatus;
  adapterType: string;
  monthlyBudget?: number;
}

export interface Issue {
  id: string;
  title: string;
  body?: string;
  status: IssueStatus;
  priority?: IssuePriority;
  assigneeId?: string;
  labels?: string[];
}

export interface Company {
  id: string;
  name: string;
  createdAt: string;
}

export interface Deployment {
  id: string;
  customerId: string;
  templateId?: string;
  name: string;
  paperclipCompanyId?: string;
  status: 'provisioning' | 'active' | 'paused' | 'suspended' | 'deleted';
  config: Record<string, unknown>;
  deployedAt?: string;
  createdAt: string;
}

export interface TemplateAgent {
  name: string;
  role: string;
  title?: string;
  capabilities?: string;
  adapterType: AdapterType;
  monthlyBudget?: number;
  reportsTo?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  imageUrl?: string;
  agents: TemplateAgent[];
}

export interface DeployTemplateRequest {
  companyName: string;
  templateId: string;
  templateData: {
    agents: TemplateAgent[];
    defaultGoals?: string[];
  };
}

export interface DeployTemplateResponse {
  company: Company;
  agents: Agent[];
  status: string;
}

export interface HealthStatus {
  status: 'connected' | 'disconnected';
  error?: string;
}
