'use client';

export default function SettingsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          SETTINGS
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Configure your account and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="max-w-2xl space-y-8">
        {/* Profile Section */}
        <section className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                NAME
              </label>
              <input
                type="text"
                defaultValue="User"
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                EMAIL
              </label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Email notifications for agent activity
              </span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-cyan-500" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Weekly summary reports
              </span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-cyan-500" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Cost threshold alerts
              </span>
              <input type="checkbox" className="w-5 h-5 accent-cyan-500" />
            </label>
          </div>
        </section>

        {/* API Keys Section */}
        <section className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            API Keys
          </h2>
          <p className="text-gray-400 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Manage your API keys for external integrations.
          </p>
          <button className="btn-secondary text-xs">
            Generate New API Key
          </button>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
