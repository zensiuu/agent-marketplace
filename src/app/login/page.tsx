export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <h1 className="text-center text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>
            WELCOME BACK
          </h1>
          <p className="text-center text-gray-500 mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Log in to manage your deployments
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                EMAIL
              </label>
              <input
                type="email"
                placeholder="agent@company.com"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" className="accent-cyan-500" />
                <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-primary w-full">
              LOGIN
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-cyan-400 hover:text-cyan-300">
                Sign up
              </a>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-xs text-gray-600 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
              OR CONTINUE WITH
            </p>
            <div className="flex gap-4">
              <button className="flex-1 py-3 border border-white/10 rounded text-gray-400 hover:border-cyan-500/50 hover:text-white transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Google
              </button>
              <button className="flex-1 py-3 border border-white/10 rounded text-gray-400 hover:border-cyan-500/50 hover:text-white transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
