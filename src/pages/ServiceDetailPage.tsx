import { useState } from 'react';
import { useApp } from '../context/AppContext';

const categoryIcons: Record<string, string> = {
  'Technology': '💻',
  'Creative': '🎨',
  'Health & Wellness': '🧘',
  'Education': '📚',
  'Business': '💼',
  'Home & Garden': '🏡',
};

export function ServiceDetailPage() {
  const { selectedServiceId, getServiceById, getUserById, currentUser, services, createExchange, navigate } = useApp();
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedMyService, setSelectedMyService] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const service = selectedServiceId ? getServiceById(selectedServiceId) : null;
  const serviceOwner = service ? getUserById(service.userId) : null;
  const myServices = currentUser ? services.filter(s => s.userId === currentUser.id) : [];

  if (!service || !serviceOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Service not found</h2>
          <button
            onClick={() => navigate('services')}
            className="text-emerald-600 hover:text-emerald-700"
          >
            ← Back to services
          </button>
        </div>
      </div>
    );
  }

  const handleExchange = () => {
    if (selectedMyService && message) {
      // Create exchange - this will also create a notification for the service owner
      createExchange(service.id, selectedMyService, message);
      setSuccess(true);
      setTimeout(() => {
        setShowExchangeModal(false);
        setSuccess(false);
        setSelectedMyService('');
        setMessage('');
      }, 2500);
    }
  };

  const isOwner = currentUser?.id === service.userId;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('services')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to services
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Image */}
          <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <span className="text-7xl">{categoryIcons[service.category] || '🔧'}</span>
          </div>

          <div className="p-8">
            {/* Title and Category */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-3">
                  {service.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
              </div>
              {!isOwner && currentUser && (
                <button
                  onClick={() => setShowExchangeModal(true)}
                  className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Propose Exchange
                </button>
              )}
              {!currentUser && (
                <button
                  onClick={() => navigate('login')}
                  className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign in to Exchange
                </button>
              )}
            </div>

            {/* Owner Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg font-bold">
                {serviceOwner.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{serviceOwner.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span>{serviceOwner.rating.toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <span>{serviceOwner.reviewCount} reviews</span>
                  {serviceOwner.location && (
                    <>
                      <span>•</span>
                      <span>{serviceOwner.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            {/* Time Estimate */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Estimated Time</h2>
              <p className="text-gray-600">{service.estimatedTime}</p>
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {service.skillsOffered.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Looking For</h2>
                <div className="flex flex-wrap gap-2">
                  {service.skillsWanted.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Modal */}
      {showExchangeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Exchange Proposed! 🎉</h3>
                <p className="text-gray-600 mb-2">{serviceOwner.name} has been notified.</p>
                <p className="text-sm text-emerald-600">Check your notifications for their response!</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Propose an Exchange</h3>
                
                {myServices.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">You need to create a service first before proposing an exchange.</p>
                    <button
                      onClick={() => {
                        setShowExchangeModal(false);
                        navigate('my-services');
                      }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      Create a Service
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-700 text-sm">
                        📬 {serviceOwner.name} will receive a notification about your exchange proposal!
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select your service to offer
                      </label>
                      <select
                        value={selectedMyService}
                        onChange={(e) => setSelectedMyService(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      >
                        <option value="">Choose a service...</option>
                        {myServices.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                        placeholder="Introduce yourself and explain why you'd like to exchange..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowExchangeModal(false)}
                        className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleExchange}
                        disabled={!selectedMyService || !message}
                        className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send Proposal
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
