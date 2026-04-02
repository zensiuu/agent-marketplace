'use client';

export default function SignupPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="font-brand text-xl font-bold tracking-[0.3em] text-primary mb-2">AGENTFORGE</h2>
        </div>
        
        <div className="glass-card p-8">
          <h1 className="text-center text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>
            CREATE ACCOUNT
          </h1>
          <p className="text-center text-gray-500 mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Start building your AI team today
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="w-full bg-surface-container-highest border-0 border-b border-outline-variant py-4 px-4 focus:ring-0 focus:border-primary transition-all text-white placeholder:text-outline/50"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                EMAIL
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-surface-container-highest border-0 border-b border-outline-variant py-4 px-4 focus:ring-0 focus:border-primary transition-all text-white placeholder:text-outline/50"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-container-highest border-0 border-b border-outline-variant py-4 px-4 focus:ring-0 focus:border-primary transition-all text-white placeholder:text-outline/50"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-container-highest border-0 border-b border-outline-variant py-4 px-4 focus:ring-0 focus:border-primary transition-all text-white placeholder:text-outline/50"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-400">
              <input type="checkbox" className="accent-primary mt-0.5" />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.5 }}>
                I agree to the{' '}
                <a href="/terms" className="text-primary hover:text-secondary">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-primary hover:text-secondary">Privacy Policy</a>
              </span>
            </label>

            <button type="submit" className="btn-primary w-full h-12 flex items-center justify-center">
              CREATE ACCOUNT
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:text-secondary">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
