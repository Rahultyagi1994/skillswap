export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  location: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  avatar: string;
  createdAt: string;
}

export interface Service {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  skillsOffered: string[];
  skillsWanted: string[];
  estimatedTime: string;
  createdAt: string;
}

export interface Exchange {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromServiceId: string;
  toServiceId: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'exchange_request' | 'exchange_accepted' | 'exchange_declined';
  title: string;
  message: string;
  read: boolean;
  exchangeId: string;
  createdAt: string;
}

export type Page = 'home' | 'login' | 'register' | 'services' | 'service-detail' | 'profile' | 'my-services' | 'exchanges' | 'notifications';
