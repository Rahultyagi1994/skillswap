import { useState } from 'react';
import { useApp } from '../context/AppContext';

export function LoginPage() {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate('home');
      } else {
        setError('Invalid email or password. Try: sarah@example.com / password');
      }
      setIsLoading(false);
    }, 300);
  };

  const handleQuickLogin = (demoEmail: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const success = login(demoEmail, 'password');
      if (success) {
        navigate('home');
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-emerald-600 mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            SkillSwap
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('register')}
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 bg-emerald-50 rounded-lg p-4">
          <p className="text-sm text-emerald-800 font-medium mb-2">Quick Login (Demo Accounts):</p>
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={() => handleQuickLogin('sarah@example.com')}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm disabled:opacity-50"
            >
              Login as Sarah Johnson
            </button>
            <button
              onClick={() => handleQuickLogin('marcus@example.com')}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm disabled:opacity-50"
            >
              Login as Marcus Chen
            </button>
            <button
              onClick={() => handleQuickLogin('emily@example.com')}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm disabled:opacity-50"
            >
              Login as Emily Rodriguez
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
