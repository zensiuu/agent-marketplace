export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-8">
        <h1 
          className="text-4xl font-bold text-white mb-8"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          PRIVACY POLICY
        </h1>
        
        <div className="glass-card p-8 space-y-6 text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.8 }}>
          <p className="text-sm">Last updated: April 2026</p>
          
          <h2 className="text-xl text-white font-bold mt-8">1. Information We Collect</h2>
          <p>
            AgentForge collects information you provide directly, including: name, email address, 
            and authentication data through Auth0. We also collect usage data such as deployed templates, 
            agent activity, and API usage metrics.
          </p>
          
          <h2 className="text-xl text-white font-bold mt-8">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain our AI agent orchestration services</li>
            <li>To process transactions and manage your account</li>
            <li>To communicate about your deployments and service updates</li>
            <li>To improve our platform and develop new features</li>
          </ul>
          
          <h2 className="text-xl text-white font-bold mt-8">3. Data Security</h2>
          <p>
            We use Auth0 for secure authentication and store sensitive credentials in their 
            Token Vault. All data is encrypted in transit using TLS 1.3 and at rest using AES-256.
          </p>
          
          <h2 className="text-xl text-white font-bold mt-8">4. Third-Party Services</h2>
          <p>
            Our platform integrates with Paperclip.ai for AI orchestration, Auth0 for authentication, 
            and external APIs (Stripe, GitHub, etc.) as connected by users through Auth0 Token Vault.
          </p>
          
          <h2 className="text-xl text-white font-bold mt-8">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. Contact us at 
            privacy@agentforge.io for any data-related requests.
          </p>
          
          <h2 className="text-xl text-white font-bold mt-8">6. Contact</h2>
          <p>
            For privacy-related questions, contact our Data Protection Officer at:<br />
            <span className="text-primary">privacy@agentforge.io</span>
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-primary hover:text-secondary transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
