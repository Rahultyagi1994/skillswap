import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';

const categories = [
  { name: 'Technology', icon: '💻', color: 'from-blue-400 to-blue-600' },
  { name: 'Creative', icon: '🎨', color: 'from-purple-400 to-purple-600' },
  { name: 'Health & Wellness', icon: '🧘', color: 'from-green-400 to-green-600' },
  { name: 'Education', icon: '📚', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Business', icon: '💼', color: 'from-orange-400 to-orange-600' },
  { name: 'Home & Garden', icon: '🏡', color: 'from-pink-400 to-pink-600' },
];

export function HomePage() {
  const { services, navigate, currentUser } = useApp();
  const featuredServices = services.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Exchange Skills, Not Cash
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Join our community of skilled individuals who trade services and learn from each other. No money needed!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('services')}
                className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Services
              </button>
              {!currentUser && (
                <button
                  onClick={() => navigate('register')}
                  className="px-8 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Join Free
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and list your skills and what you're looking to learn or receive.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Matches</h3>
              <p className="text-gray-600">Browse services and find people who offer what you need and want what you have.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exchange Skills</h3>
              <p className="text-gray-600">Connect, agree on terms, and swap services. It's that simple!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate('services')}
                className="p-6 rounded-xl bg-gradient-to-br hover:shadow-lg transition-all text-white text-center"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              >
                <div className={`bg-gradient-to-br ${category.color} p-6 rounded-xl hover:shadow-lg transition-all`}>
                  <span className="text-3xl mb-2 block">{category.icon}</span>
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            <button
              onClick={() => navigate('services')}
              className="text-emerald-600 font-medium hover:text-emerald-700"
            >
              View All →
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!currentUser && (
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Swapping?</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of people who are already exchanging skills and services. It's free to sign up!
            </p>
            <button
              onClick={() => navigate('register')}
              className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Your Account
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-white text-xl font-bold mb-4 md:mb-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              SkillSwap
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2026 SkillSwap. All rights reserved.</p>
              <p className="text-sm mt-1">Designed and Developed by <span className="text-emerald-400 font-medium">Rahul Tyagi</span></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
