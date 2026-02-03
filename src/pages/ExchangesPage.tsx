import { useApp } from '../context/AppContext';

export function ExchangesPage() {
  const { currentUser, exchanges, updateExchangeStatus, getUserById, getServiceById, navigate } = useApp();

  if (!currentUser) {
    navigate('login');
    return null;
  }

  const incomingExchanges = exchanges.filter(e => e.toUserId === currentUser.id);
  const outgoingExchanges = exchanges.filter(e => e.fromUserId === currentUser.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Pending</span>;
      case 'accepted':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Accepted</span>;
      case 'declined':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Declined</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exchanges</h1>
          <p className="text-gray-600">Manage your skill exchange proposals</p>
        </div>

        {/* Incoming Exchanges */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Incoming Proposals ({incomingExchanges.length})
          </h2>

          {incomingExchanges.length > 0 ? (
            <div className="space-y-4">
              {incomingExchanges.map(exchange => {
                const fromUser = getUserById(exchange.fromUserId);
                const fromService = getServiceById(exchange.fromServiceId);
                const toService = getServiceById(exchange.toServiceId);

                return (
                  <div key={exchange.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                          {fromUser?.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{fromUser?.name}</p>
                          <p className="text-sm text-gray-500">{exchange.createdAt}</p>
                        </div>
                      </div>
                      {getStatusBadge(exchange.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-xs text-emerald-600 font-medium mb-1">They're offering:</p>
                        <p className="font-medium text-gray-900">{fromService?.title}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-xs text-orange-600 font-medium mb-1">For your:</p>
                        <p className="font-medium text-gray-900">{toService?.title}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700">{exchange.message}</p>
                    </div>

                    {exchange.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateExchangeStatus(exchange.id, 'accepted')}
                          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateExchangeStatus(exchange.id, 'declined')}
                          className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-600">No incoming proposals yet</p>
            </div>
          )}
        </div>

        {/* Outgoing Exchanges */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Sent Proposals ({outgoingExchanges.length})
          </h2>

          {outgoingExchanges.length > 0 ? (
            <div className="space-y-4">
              {outgoingExchanges.map(exchange => {
                const toUser = getUserById(exchange.toUserId);
                const fromService = getServiceById(exchange.fromServiceId);
                const toService = getServiceById(exchange.toServiceId);

                return (
                  <div key={exchange.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {toUser?.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">To: {toUser?.name}</p>
                          <p className="text-sm text-gray-500">{exchange.createdAt}</p>
                        </div>
                      </div>
                      {getStatusBadge(exchange.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-xs text-emerald-600 font-medium mb-1">You're offering:</p>
                        <p className="font-medium text-gray-900">{fromService?.title}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-xs text-orange-600 font-medium mb-1">For their:</p>
                        <p className="font-medium text-gray-900">{toService?.title}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">{exchange.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">You haven't sent any proposals yet</p>
              <button
                onClick={() => navigate('services')}
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                Browse Services →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
