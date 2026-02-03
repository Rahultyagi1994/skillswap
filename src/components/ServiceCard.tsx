import { useApp } from '../context/AppContext';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const categoryColors: Record<string, string> = {
  'Technology': 'bg-blue-100 text-blue-700',
  'Creative': 'bg-purple-100 text-purple-700',
  'Health & Wellness': 'bg-green-100 text-green-700',
  'Education': 'bg-yellow-100 text-yellow-700',
  'Business': 'bg-orange-100 text-orange-700',
  'Home & Garden': 'bg-pink-100 text-pink-700',
};

const categoryIcons: Record<string, string> = {
  'Technology': '💻',
  'Creative': '🎨',
  'Health & Wellness': '🧘',
  'Education': '📚',
  'Business': '💼',
  'Home & Garden': '🏡',
};

export function ServiceCard({ service }: ServiceCardProps) {
  const { navigate, getUserById } = useApp();
  const user = getUserById(service.userId);

  return (
    <div
      onClick={() => navigate('service-detail', service.id)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
        <span className="text-5xl">{categoryIcons[service.category] || '🔧'}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[service.category] || 'bg-gray-100 text-gray-700'}`}>
            {service.category}
          </span>
          <span className="text-xs text-gray-500">{service.estimatedTime}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
              {user?.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-xs text-gray-500">{user?.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {service.skillsOffered.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
