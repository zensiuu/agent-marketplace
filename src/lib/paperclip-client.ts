import type {
  Agent,
  AgentStatus,
  Company,
  Deployment,
  HealthStatus,
  Issue,
  IssuePriority,
  Template,
  DeployTemplateRequest,
  DeployTemplateResponse
} from '@/types/paperclip';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `API error ${response.status}`);
  }

  return response.json();
}

export const paperclipApi = {
  async healthCheck(): Promise<HealthStatus> {
    return fetchApi<HealthStatus>('/api/paperclip/health');
  },

  async listCompanies(): Promise<Company[]> {
    const data = await fetchApi<{ companies: Company[] }>('/api/paperclip/companies');
    return data.companies;
  },

  async createCompany(name: string): Promise<Company> {
    return fetchApi<Company>('/api/paperclip/companies', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  async listAgents(companyId: string): Promise<Agent[]> {
    const data = await fetchApi<{ agents: Agent[] }>(`/api/paperclip/companies/${companyId}/agents`);
    return data.agents;
  },

  async hireAgent(companyId: string, agent: {
    name: string;
    role: string;
    title?: string;
    capabilities?: string;
    adapterType?: string;
    monthlyBudget?: number;
    reportsTo?: string;
  }): Promise<Agent> {
    return fetchApi<Agent>(`/api/paperclip/companies/${companyId}/agents`, {
      method: 'POST',
      body: JSON.stringify(agent),
    });
  },

  async updateAgent(
    companyId: string,
    agentId: string,
    updates: { monthlyBudget?: number; status?: AgentStatus }
  ): Promise<Agent> {
    return fetchApi<Agent>(`/api/paperclip/companies/${companyId}/agents/${agentId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async createIssue(companyId: string, issue: {
    title: string;
    body?: string;
    priority?: IssuePriority;
    assigneeId?: string;
    labels?: string[];
  }): Promise<Issue> {
    return fetchApi<Issue>(`/api/paperclip/companies/${companyId}/issues`, {
      method: 'POST',
      body: JSON.stringify(issue),
    });
  },

  async listIssues(companyId: string): Promise<Issue[]> {
    const data = await fetchApi<{ issues: Issue[] }>(`/api/paperclip/companies/${companyId}/issues`);
    return data.issues;
  },

  async triggerWakeup(agentId: string): Promise<{ runId: string }> {
    return fetchApi<{ runId: string }>(`/api/paperclip/agents/${agentId}/wakeup`, {
      method: 'POST',
    });
  },

  async deployTemplate(request: DeployTemplateRequest): Promise<DeployTemplateResponse> {
    return fetchApi<DeployTemplateResponse>('/api/paperclip/deploy-template', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },
};

export const templateApi = {
  async list(): Promise<Template[]> {
    const data = await fetchApi<{ templates: Template[] }>('/api/marketplace/templates');
    return data.templates;
  },

  async get(id: string): Promise<Template> {
    return fetchApi<Template>(`/api/marketplace/templates/${id}`);
  },

  async deploy(id: string, companyName: string): Promise<DeployTemplateResponse> {
    return paperclipApi.deployTemplate({
      companyName,
      templateId: id,
      templateData: (await this.get(id)) as unknown as DeployTemplateRequest['templateData'],
    });
  },
};

export const deploymentApi = {
  async list(): Promise<Deployment[]> {
    const data = await fetchApi<{ deployments: Deployment[] }>('/api/companies/deployments');
    return data.deployments;
  },

  async get(id: string): Promise<Deployment> {
    return fetchApi<Deployment>(`/api/companies/deployments/${id}`);
  },

  async create(deployment: {
    templateId: string;
    name: string;
    paperclipCompanyId: string;
  }): Promise<Deployment> {
    return fetchApi<Deployment>('/api/companies/deployments', {
      method: 'POST',
      body: JSON.stringify(deployment),
    });
  },

  async updateStatus(id: string, status: Deployment['status']): Promise<Deployment> {
    return fetchApi<Deployment>(`/api/companies/deployments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};
