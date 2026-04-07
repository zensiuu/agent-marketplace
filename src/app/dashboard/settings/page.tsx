'use client';

import { useState, useCallback, useEffect } from 'react';

// Toggle Switch Component
function ToggleSwitch({ 
  enabled, 
  onChange, 
  label,
  description
}: { 
  enabled: boolean; 
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 group">
      <div className="flex-1">
        <p className="text-gray-200 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 
          focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]
          ${enabled ? 'bg-cyan-500' : 'bg-surface-variant'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg 
            ring-0 transition duration-200 ease-in-out
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        >
          <span 
            className={`
              absolute inset-0 flex h-full w-full items-center justify-center transition-opacity
              ${enabled ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <svg className="h-3 w-3 text-cyan-500" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  );
}

// Expandable Section Component
function ExpandableSection({ 
  title, 
  icon, 
  children, 
  defaultOpen = false
}: { 
  title: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:border-cyan-500/20">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            {icon}
          </div>
          <h2 
            className="text-lg font-semibold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}
          >
            {title}
          </h2>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-5 pt-0 border-t border-white/5">
          {children}
        </div>
      </div>
    </div>
  );
}

// Save Status Indicator
function SaveStatus({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  const config = {
    idle: { color: 'text-gray-500', text: 'No changes', icon: null },
    saving: { color: 'text-cyan-400', text: 'Saving...', icon: (
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    )},
    saved: { color: 'text-green-400', text: 'Saved', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )},
    error: { color: 'text-red-400', text: 'Error saving', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )},
  };

  const { color, text, icon } = config[status];

  return (
    <div className={`flex items-center gap-2 ${color}`} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '12px' }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

// API Key Item Component
function APIKeyItem({ name, apiKey: keyPreview, lastUsed, onDelete }: { name: string; apiKey: string; lastUsed: string; onDelete: () => void }) {
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-white/5">
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{name}</p>
        <p className="text-xs text-gray-500 font-mono mt-1">
          {showKey ? keyPreview : '••••••••••••••••' + keyPreview.slice(-4)}
        </p>
        <p className="text-xs text-gray-600 mt-1">Last used: {lastUsed}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setShowKey(!showKey)}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title={showKey ? 'Hide key' : 'Show key'}
        >
          {showKey ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
        <button 
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
          title="Delete key"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  // Form state
  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    timezone: 'America/New_York',
    avatar: '',
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    accentColor: 'cyan',
    compactMode: false,
    reduceMotion: false,
  });

  const [notifications, setNotifications] = useState({
    emailActivity: true,
    weeklyDigest: true,
    costAlerts: false,
    pushNotifications: false,
    marketingEmails: false,
    costThreshold: 100,
  });

  const [display, setDisplay] = useState({
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: 10,
    defaultView: 'grid',
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    activityTracking: true,
    dataCollection: false,
  });

  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    fontSize: 'medium',
    keyboardShortcuts: true,
  });

  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API Key', key: 'agf_prod_8f7a9b2c4d6e1f3a5h7j9k2l4m6n8p0', lastUsed: '2 hours ago' },
    { id: '2', name: 'Development Key', key: 'agf_dev_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6', lastUsed: '1 day ago' },
  ]);

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Auto-save effect
  useEffect(() => {
    if (saveStatus === 'idle') return;
    
    const timer = setTimeout(() => {
      setSaveStatus('idle');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [saveStatus]);

  const handleSave = useCallback(() => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  }, []);

  const handleGenerateApiKey = useCallback(() => {
    if (!newKeyName.trim()) return;
    
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `agf_new_${Math.random().toString(36).substring(2, 34)}`,
      lastUsed: 'Just now',
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setShowApiKeyModal(false);
    setSaveStatus('saved');
  }, [newKeyName, apiKeys]);

  const handleDeleteApiKey = useCallback((id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    setSaveStatus('saved');
  }, [apiKeys]);

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 
              className="text-2xl lg:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
            >
              SETTINGS
            </h1>
            <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Manage your account preferences and configurations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SaveStatus status={saveStatus} />
            <button 
              onClick={handleSave}
              className="btn-primary"
              disabled={saveStatus === 'saving'}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="max-w-3xl space-y-4">
        {/* Profile Section */}
        <ExpandableSection 
          title="PROFILE" 
          defaultOpen={true}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                D
              </div>
              <div>
                <button className="btn-secondary text-xs mb-2">Upload Photo</button>
                <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  DISPLAY NAME
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors rounded-lg"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors rounded-lg"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                TIMEZONE
              </label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors rounded-lg"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </ExpandableSection>

        {/* Appearance Section */}
        <ExpandableSection 
          title="APPEARANCE" 
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
          }
        >
          <div className="space-y-1">
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                THEME
              </label>
              <div className="flex gap-3">
                {['dark', 'light', 'system'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setAppearance({ ...appearance, theme })}
                    className={`
                      flex-1 py-3 px-4 rounded-lg border transition-all capitalize
                      ${appearance.theme === theme 
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                      }
                    `}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                ACCENT COLOR
              </label>
              <div className="flex gap-3">
                {[
                  { name: 'Cyan', value: 'cyan', color: '#00d4ff' },
                  { name: 'Purple', value: 'purple', color: '#8b5cf6' },
                  { name: 'Green', value: 'green', color: '#22c55e' },
                  { name: 'Orange', value: 'orange', color: '#f97316' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setAppearance({ ...appearance, accentColor: item.value })}
                    className={`
                      w-12 h-12 rounded-lg border-2 transition-all flex items-center justify-center
                      ${appearance.accentColor === item.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'}
                    `}
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  >
                    {appearance.accentColor === item.value && (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <ToggleSwitch 
              enabled={appearance.compactMode}
              onChange={(value) => setAppearance({ ...appearance, compactMode: value })}
              label="Compact Mode"
              description="Use a denser layout with smaller spacing"
            />
            <ToggleSwitch 
              enabled={appearance.reduceMotion}
              onChange={(value) => setAppearance({ ...appearance, reduceMotion: value })}
              label="Reduce Motion"
              description="Minimize animations and transitions"
            />
          </div>
        </ExpandableSection>

        {/* Notifications Section */}
        <ExpandableSection 
          title="NOTIFICATIONS" 
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          }
        >
          <div className="space-y-1">
            <ToggleSwitch 
              enabled={notifications.emailActivity}
              onChange={(value) => setNotifications({ ...notifications, emailActivity: value })}
              label="Agent Activity Emails"
              description="Get notified when agents complete tasks or encounter errors"
            />
            <ToggleSwitch 
              enabled={notifications.weeklyDigest}
              onChange={(value) => setNotifications({ ...notifications, weeklyDigest: value })}
              label="Weekly Summary"
              description="Receive a weekly report of your agent performance"
            />
            <ToggleSwitch 
              enabled={notifications.costAlerts}
              onChange={(value) => setNotifications({ ...notifications, costAlerts: value })}
              label="Cost Threshold Alerts"
              description="Alert when spending exceeds your set threshold"
            />
            <ToggleSwitch 
              enabled={notifications.pushNotifications}
              onChange={(value) => setNotifications({ ...notifications, pushNotifications: value })}
              label="Push Notifications"
              description="Browser push notifications for real-time updates"
            />
            <ToggleSwitch 
              enabled={notifications.marketingEmails}
              onChange={(value) => setNotifications({ ...notifications, marketingEmails: value })}
              label="Product Updates"
              description="News about new features and improvements"
            />
            
            {notifications.costAlerts && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  COST THRESHOLD (USD)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={notifications.costThreshold}
                    onChange={(e) => setNotifications({ ...notifications, costThreshold: Number(e.target.value) })}
                    className="flex-1 accent-cyan-500"
                  />
                  <span className="text-cyan-400 font-bold w-16 text-right" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ${notifications.costThreshold}
                  </span>
                </div>
              </div>
            )}
          </div>
        </ExpandableSection>

        {/* Display Section */}
        <ExpandableSection 
          title="DISPLAY" 
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                LANGUAGE
              </label>
              <select
                value={display.language}
                onChange={(e) => setDisplay({ ...display, language: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors rounded-lg"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                DATE FORMAT
              </label>
              <div className="flex gap-3">
                {['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map((format) => (
                  <button
                    key={format}
                    onClick={() => setDisplay({ ...display, dateFormat: format })}
                    className={`
                      py-2 px-4 rounded-lg border transition-all text-sm
                      ${display.dateFormat === format 
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                      }
                    `}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                ITEMS PER PAGE
              </label>
              <select
                value={display.itemsPerPage}
                onChange={(e) => setDisplay({ ...display, itemsPerPage: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors rounded-lg"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                DEFAULT VIEW
              </label>
              <div className="flex gap-3">
                {['grid', 'list'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setDisplay({ ...display, defaultView: view })}
                    className={`
                      flex-1 py-2 px-4 rounded-lg border transition-all capitalize
                      ${display.defaultView === view 
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                      }
                    `}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ExpandableSection>

        {/* Privacy Section */}
        <ExpandableSection 
          title="PRIVACY & SECURITY" 
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          }
        >
          <div className="space-y-1">
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                PROFILE VISIBILITY
              </label>
              <div className="flex gap-3">
                {['public', 'team', 'private'].map((visibility) => (
                  <button
                    key={visibility}
                    onClick={() => setPrivacy({ ...privacy, profileVisibility: visibility })}
                    className={`
                      flex-1 py-2 px-4 rounded-lg border transition-all capitalize text-sm
                      ${privacy.profileVisibility === visibility 
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                      }
                    `}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {visibility}
                  </button>
                ))}
              </div>
            </div>
            
            <ToggleSwitch 
              enabled={privacy.activityTracking}
              onChange={(value) => setPrivacy({ ...privacy, activityTracking: value })}
              label="Activity Tracking"
              description="Allow tracking to improve your experience"
            />
            <ToggleSwitch 
              enabled={privacy.dataCollection}
              onChange={(value) => setPrivacy({ ...privacy, dataCollection: value })}
              label="Usage Data Collection"
              description="Share anonymous usage data to help us improve"
            />
            
            <div className="pt-4 mt-4 border-t border-white/5">
              <button className="btn-secondary text-xs w-full mb-3">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export All Data
                </span>
              </button>
              <p className="text-xs text-gray-500 text-center">Download a copy of all your data</p>
            </div>
          </div>
        </ExpandableSection>

        {/* Accessibility Section */}
        <ExpandableSection 
          title="ACCESSIBILITY" 
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          }
        >
          <div className="space-y-1">
            <ToggleSwitch 
              enabled={accessibility.highContrast}
              onChange={(value) => setAccessibility({ ...accessibility, highContrast: value })}
              label="High Contrast Mode"
              description="Increase contrast for better visibility"
            />
            <ToggleSwitch 
              enabled={accessibility.keyboardShortcuts}
              onChange={(value) => setAccessibility({ ...accessibility, keyboardShortcuts: value })}
              label="Keyboard Shortcuts"
              description="Enable keyboard navigation shortcuts"
            />
            
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                FONT SIZE
              </label>
              <div className="flex gap-2">
                {['small', 'medium', 'large', 'x-large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setAccessibility({ ...accessibility, fontSize: size })}
                    className={`
                      flex-1 py-2 px-3 rounded-lg border transition-all text-xs capitalize
                      ${accessibility.fontSize === size 
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                      }
                    `}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ExpandableSection>

        {/* API Keys Section */}
        <ExpandableSection 
          title="API KEYS" 
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Manage API keys for external integrations. Keep your keys secure and never share them publicly.
            </p>
            
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <APIKeyItem 
                  key={apiKey.id}
                  name={apiKey.name}
                  apiKey={apiKey.key}
                  lastUsed={apiKey.lastUsed}
                  onDelete={() => handleDeleteApiKey(apiKey.id)}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setShowApiKeyModal(true)}
              className="btn-primary w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Generate New API Key
              </span>
            </button>
          </div>
        </ExpandableSection>

        {/* Danger Zone */}
        <div className="glass-card p-5 border-red-500/20 mt-8">
          <h3 className="text-lg font-semibold text-red-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}>
            DANGER ZONE
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-200 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Delete Account
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}>
                GENERATE API KEY
              </h3>
              <button 
                onClick={() => setShowApiKeyModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  KEY NAME
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production Key"
                  className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors rounded-lg"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowApiKeyModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleGenerateApiKey}
                  className="btn-primary flex-1"
                  disabled={!newKeyName.trim()}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
