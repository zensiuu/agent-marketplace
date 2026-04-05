import { describe, it, expect, vi } from 'vitest';
import { paperclipApi, templateApi, deploymentApi } from '@/lib/paperclip-client';

describe('Paperclip API Client', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('should have healthCheck method', () => {
    expect(typeof paperclipApi.healthCheck).toBe('function');
  });

  it('should have listCompanies method', () => {
    expect(typeof paperclipApi.listCompanies).toBe('function');
  });

  it('should have createCompany method', () => {
    expect(typeof paperclipApi.createCompany).toBe('function');
  });

  it('should have listAgents method', () => {
    expect(typeof paperclipApi.listAgents).toBe('function');
  });

  it('should have hireAgent method', () => {
    expect(typeof paperclipApi.hireAgent).toBe('function');
  });

  it('should have updateAgent method', () => {
    expect(typeof paperclipApi.updateAgent).toBe('function');
  });

  it('should have createIssue method', () => {
    expect(typeof paperclipApi.createIssue).toBe('function');
  });

  it('should have deployTemplate method', () => {
    expect(typeof paperclipApi.deployTemplate).toBe('function');
  });

  describe('API calls', () => {
    it('should fetch health status', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: 'connected' }),
      });

      const result = await paperclipApi.healthCheck();
      expect(result).toEqual({ status: 'connected' });
    });

    it('should list companies', async () => {
      const mockCompanies = [
        { id: '1', name: 'Test Company', createdAt: '2024-01-01' },
      ];
      
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ companies: mockCompanies }),
      });

      const result = await paperclipApi.listCompanies();
      expect(result).toEqual(mockCompanies);
    });

    it('should throw error on failed request', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      });

      await expect(paperclipApi.listCompanies()).rejects.toThrow();
    });
  });
});

describe('Template API Client', () => {
  it('should have list method', () => {
    expect(typeof templateApi.list).toBe('function');
  });

  it('should have get method', () => {
    expect(typeof templateApi.get).toBe('function');
  });

  it('should have deploy method', () => {
    expect(typeof templateApi.deploy).toBe('function');
  });
});

describe('Deployment API Client', () => {
  it('should have list method', () => {
    expect(typeof deploymentApi.list).toBe('function');
  });

  it('should have get method', () => {
    expect(typeof deploymentApi.get).toBe('function');
  });

  it('should have create method', () => {
    expect(typeof deploymentApi.create).toBe('function');
  });

  it('should have updateStatus method', () => {
    expect(typeof deploymentApi.updateStatus).toBe('function');
  });
});
