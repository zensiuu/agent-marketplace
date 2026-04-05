'use client';

import { useState } from 'react';
import { paperclipApi, templateApi, deploymentApi } from '@/lib/paperclip-client';
import type { Template } from '@/types/paperclip';

export default function DeployTemplate() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useState(() => {
    async function loadTemplates() {
      try {
        const data = await templateApi.list();
        setTemplates(data);
      } catch (err) {
        console.error('Failed to load templates:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTemplates();
  });

  async function handleDeploy(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedTemplate || !companyName.trim()) return;

    setDeploying(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await paperclipApi.deployTemplate({
        companyName: companyName.trim(),
        templateId: selectedTemplate.id,
        templateData: {
          agents: selectedTemplate.agents,
          defaultGoals: [`Run ${selectedTemplate.name} operations`],
        },
      });

      await deploymentApi.create({
        templateId: selectedTemplate.id,
        name: companyName.trim(),
        paperclipCompanyId: result.company.id,
      });

      setSuccess(`Successfully deployed ${selectedTemplate.name}! Company: ${result.company.name}`);
      setCompanyName('');
      setSelectedTemplate(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment failed');
    } finally {
      setDeploying(false);
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="bg-gray-100 h-32 rounded-lg"></div>
        <div className="bg-gray-100 h-32 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Deploy Template</h3>
        <p className="text-sm text-gray-500 mb-4">
          Instantly deploy an AI company template to your Paperclip account
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}

      {templates.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No templates available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <span className="text-sm font-medium text-gray-600">${template.price}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {template.agents.slice(0, 3).map((agent, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {agent.role}
                  </span>
                ))}
                {template.agents.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    +{template.agents.length - 3}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedTemplate && (
        <form onSubmit={handleDeploy} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="font-medium text-gray-900 mb-4">
            Deploy: {selectedTemplate.name}
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Acme Corp Operations"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedTemplate(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={deploying || !companyName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {deploying ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⟳</span> Deploying...
                  </span>
                ) : (
                  'Deploy Now'
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
