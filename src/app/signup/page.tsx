export default function SignupPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <h1 className="text-center text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>
            CREATE ACCOUNT
          </h1>
          <p className="text-center text-gray-500 mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Start deploying AI teams today
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                EMAIL
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-400">
              <input type="checkbox" className="accent-cyan-500 mt-1" />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.5 }}>
                I agree to the{' '}
                <a href="/terms" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
              </span>
            </label>

            <button type="submit" className="btn-primary w-full">
              CREATE ACCOUNT
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Already have an account?{' '}
              <a href="/login" className="text-cyan-400 hover:text-cyan-300">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
