import { z } from 'zod';

const PAPERCLIP_API_URL = process.env.PAPERCLIP_API_URL || 'https://api.paperclip.ai';
const PAPERCLIP_API_KEY = process.env.PAPERCLIP_API_KEY;

if (!PAPERCLIP_API_KEY) {
  console.warn('PAPERCLIP_API_KEY not set - Paperclip integration disabled');
}

const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  title: z.string().optional(),
  status: z.enum(['active', 'paused', 'terminated', 'idle', 'running', 'error']),
  adapterType: z.string(),
  monthlyBudget: z.number().optional(),
});

const IssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'done', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  assigneeId: z.string().optional(),
  labels: z.array(z.string()).optional(),
});

const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
});

export type Agent = z.infer<typeof AgentSchema>;
export type Issue = z.infer<typeof IssueSchema>;
export type Company = z.infer<typeof CompanySchema>;

class PaperclipClient {
  private baseUrl: string;
  private apiKey: string | undefined;

  constructor() {
    this.baseUrl = PAPERCLIP_API_URL;
    this.apiKey = PAPERCLIP_API_KEY;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Paperclip API key not configured');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Paperclip API error ${response.status}: ${error}`);
    }

    return response.json();
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.request<{ status: string }>('/api/health');
      return true;
    } catch {
      return false;
    }
  }

  async listCompanies(): Promise<Company[]> {
    const data = await this.request<{ companies: Company[] }>('/api/companies');
    return data.companies;
  }

  async createCompany(name: string): Promise<Company> {
    return this.request<Company>('/api/companies', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  async listAgents(companyId: string): Promise<Agent[]> {
    const data = await this.request<{ agents: Agent[] }>(
      `/api/companies/${companyId}/agents`
    );
    return data.agents;
  }

  async hireAgent(companyId: string, agentConfig: {
    name: string;
    role: string;
    title?: string;
    capabilities?: string;
    adapterType: string;
    adapterConfig?: Record<string, unknown>;
    runtimeConfig?: {
      heartbeat?: {
        enabled?: boolean;
        intervalSec?: number;
        wakeOnAssignment?: boolean;
      };
    };
    monthlyBudget?: number;
    reportsTo?: string;
  }): Promise<Agent> {
    return this.request<Agent>(
      `/api/companies/${companyId}/agent-hires`,
      {
        method: 'POST',
        body: JSON.stringify(agentConfig),
      }
    );
  }

  async updateAgent(
    companyId: string,
    agentId: string,
    updates: Partial<{
      monthlyBudget: number;
      status: 'active' | 'paused' | 'terminated';
    }>
  ): Promise<Agent> {
    return this.request<Agent>(
      `/api/companies/${companyId}/agents/${agentId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updates),
      }
    );
  }

  async createIssue(companyId: string, issue: {
    title: string;
    body?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    assigneeId?: string;
    labels?: string[];
  }): Promise<Issue> {
    return this.request<Issue>(`/api/companies/${companyId}/issues`, {
      method: 'POST',
      body: JSON.stringify(issue),
    });
  }

  async listIssues(companyId: string): Promise<Issue[]> {
    const data = await this.request<{ issues: Issue[] }>(
      `/api/companies/${companyId}/issues`
    );
    return data.issues;
  }

  async exportCompanyTemplate(companyId: string): Promise<{
    agents: Agent[];
    skills: string[];
    structure: Record<string, unknown>;
  }> {
    return this.request(`/api/companies/${companyId}/export`, {
      method: 'GET',
    });
  }

  async importCompanyTemplate(template: {
    name: string;
    agents: Agent[];
    skills: string[];
  }): Promise<Company> {
    return this.request('/api/companies/import', {
      method: 'POST',
      body: JSON.stringify(template),
    });
  }

  async getAgentStatus(agentId: string): Promise<{
    status: string;
    lastHeartbeat: string;
    currentTask?: Issue;
  }> {
    return this.request(`/api/agents/${agentId}/status`);
  }

  async triggerHeartbeat(agentId: string): Promise<{ runId: string }> {
    return this.request(`/api/agents/${agentId}/wakeup`, {
      method: 'POST',
    });
  }
}

export const paperclip = new PaperclipClient();
