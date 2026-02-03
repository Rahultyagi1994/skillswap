import { useApp } from '../context/AppContext';

export function Navbar() {
  const { currentUser, logout, navigate, currentPage, getUnreadNotificationCount } = useApp();
  const unreadCount = getUnreadNotificationCount();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 text-xl font-bold text-emerald-600"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              SkillSwap
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('home')}
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('services')}
              className={`text-sm font-medium transition-colors ${currentPage === 'services' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Browse Services
            </button>
            {currentUser && (
              <>
                <button
                  onClick={() => navigate('my-services')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'my-services' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  My Services
                </button>
                <button
                  onClick={() => navigate('exchanges')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'exchanges' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Exchanges
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <button
                  onClick={() => navigate('notifications')}
                  className={`relative p-2 rounded-full transition-colors ${
                    currentPage === 'notifications' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigate('profile')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.avatar}
                  </div>
                  <span className="hidden sm:block">{currentUser.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('login')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('register')}
                  className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-100 px-4 py-2">
        <div className="flex gap-4 overflow-x-auto">
          <button
            onClick={() => navigate('home')}
            className={`text-sm font-medium whitespace-nowrap py-2 ${currentPage === 'home' ? 'text-emerald-600' : 'text-gray-600'}`}
          >
            Home
          </button>
          <button
            onClick={() => navigate('services')}
            className={`text-sm font-medium whitespace-nowrap py-2 ${currentPage === 'services' ? 'text-emerald-600' : 'text-gray-600'}`}
          >
            Browse
          </button>
          {currentUser && (
            <>
              <button
                onClick={() => navigate('my-services')}
                className={`text-sm font-medium whitespace-nowrap py-2 ${currentPage === 'my-services' ? 'text-emerald-600' : 'text-gray-600'}`}
              >
                My Services
              </button>
              <button
                onClick={() => navigate('exchanges')}
                className={`text-sm font-medium whitespace-nowrap py-2 ${currentPage === 'exchanges' ? 'text-emerald-600' : 'text-gray-600'}`}
              >
                Exchanges
              </button>
              <button
                onClick={() => navigate('notifications')}
                className={`text-sm font-medium whitespace-nowrap py-2 flex items-center gap-1 ${currentPage === 'notifications' ? 'text-emerald-600' : 'text-gray-600'}`}
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
