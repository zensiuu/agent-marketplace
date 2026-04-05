'use client';

import { useEffect, useState } from 'react';
import { paperclipApi } from '@/lib/paperclip-client';
import type { Issue, IssuePriority } from '@/types/paperclip';

interface IssueListProps {
  companyId: string;
}

export default function IssueList({ companyId }: IssueListProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, [companyId]);

  async function fetchIssues() {
    setLoading(true);
    try {
      const data = await paperclipApi.listIssues(companyId);
      setIssues(data);
      setError(null);
    } catch (err) {
      setError('Failed to load issues');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-16"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <button onClick={fetchIssues} className="mt-2 text-sm underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Issues / Tasks</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
        >
          + Create Issue
        </button>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">No issues created yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
          >
            Create First Issue
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateIssueModal companyId={companyId} onClose={() => setShowCreateModal(false)} onCreated={fetchIssues} />
      )}
    </div>
  );
}

function IssueCard({ issue }: { issue: Issue }) {
  const priorityColors: Record<IssuePriority, string> = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
  };

  const statusColors: Record<string, string> = {
    todo: 'bg-gray-100 text-gray-600',
    in_progress: 'bg-blue-100 text-blue-700',
    done: 'bg-green-100 text-green-700',
    cancelled: 'bg-gray-100 text-gray-400',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-200 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900">{issue.title}</h4>
            {issue.priority && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[issue.priority]}`}>
                {issue.priority}
              </span>
            )}
          </div>
          {issue.body && <p className="text-sm text-gray-500 line-clamp-2">{issue.body}</p>}
        </div>
        <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${statusColors[issue.status]}`}>
          {issue.status.replace('_', ' ')}
        </span>
      </div>
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex gap-1 mt-2">
          {issue.labels.map((label) => (
            <span key={label} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateIssueModal({
  companyId,
  onClose,
  onCreated,
}: {
  companyId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('medium');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await paperclipApi.createIssue(companyId, {
        title,
        body,
        priority,
      });
      onCreated();
      onClose();
    } catch (err) {
      alert('Failed to create issue');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Create Issue</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Issue title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="Optional description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as IssuePriority)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
