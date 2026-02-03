import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Service, Exchange, Notification, Page } from '../types';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  services: Service[];
  exchanges: Exchange[];
  notifications: Notification[];
  currentPage: Page;
  selectedServiceId: string | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  navigate: (page: Page, serviceId?: string) => void;
  updateProfile: (updates: Partial<User>) => void;
  addService: (service: Omit<Service, 'id' | 'userId' | 'createdAt'>) => void;
  deleteService: (serviceId: string) => void;
  createExchange: (toServiceId: string, fromServiceId: string, message: string) => void;
  updateExchangeStatus: (exchangeId: string, status: 'accepted' | 'declined') => void;
  getUserById: (userId: string) => User | undefined;
  getServiceById: (serviceId: string) => Service | undefined;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  getUnreadNotificationCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password',
    bio: 'Full-stack developer with 5 years of experience. Love teaching and learning new skills!',
    location: 'San Francisco, CA',
    skills: ['Web Development', 'React', 'Node.js', 'Python'],
    rating: 4.8,
    reviewCount: 24,
    avatar: 'SJ',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    email: 'marcus@example.com',
    password: 'password',
    bio: 'Professional photographer and videographer. Happy to trade skills!',
    location: 'Los Angeles, CA',
    skills: ['Photography', 'Video Editing', 'Photoshop', 'Lightroom'],
    rating: 4.9,
    reviewCount: 31,
    avatar: 'MC',
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    password: 'password',
    bio: 'Certified yoga instructor and wellness coach. Passionate about helping others.',
    location: 'Austin, TX',
    skills: ['Yoga', 'Meditation', 'Nutrition', 'Life Coaching'],
    rating: 5.0,
    reviewCount: 18,
    avatar: 'ER',
    createdAt: '2024-01-20'
  }
];

const initialServices: Service[] = [
  {
    id: '1',
    userId: '1',
    title: 'Web Development Lessons',
    description: 'I will teach you modern web development including HTML, CSS, JavaScript, and React. Perfect for beginners or intermediate developers looking to level up.',
    category: 'Technology',
    skillsOffered: ['React', 'JavaScript', 'HTML/CSS'],
    skillsWanted: ['Photography', 'Graphic Design', 'Music Lessons'],
    estimatedTime: '2-3 hours per session',
    createdAt: '2024-03-01'
  },
  {
    id: '2',
    userId: '2',
    title: 'Professional Photo Shoot',
    description: 'Professional photography session for portraits, headshots, or product photography. Includes editing and retouching.',
    category: 'Creative',
    skillsOffered: ['Photography', 'Photo Editing'],
    skillsWanted: ['Web Development', 'Marketing', 'Cooking'],
    estimatedTime: '3-4 hours',
    createdAt: '2024-03-05'
  },
  {
    id: '3',
    userId: '3',
    title: 'Private Yoga Sessions',
    description: 'Personalized yoga sessions tailored to your level and goals. Includes breathing exercises and meditation techniques.',
    category: 'Health & Wellness',
    skillsOffered: ['Yoga', 'Meditation'],
    skillsWanted: ['Cooking', 'Language Lessons', 'Music'],
    estimatedTime: '1 hour per session',
    createdAt: '2024-03-10'
  },
  {
    id: '4',
    userId: '1',
    title: 'Python Programming Tutoring',
    description: 'Learn Python from scratch or improve your existing skills. Covers basics to advanced topics including data science and automation.',
    category: 'Technology',
    skillsOffered: ['Python', 'Data Science'],
    skillsWanted: ['Video Editing', 'Fitness Training', 'Writing'],
    estimatedTime: '1-2 hours per session',
    createdAt: '2024-03-12'
  },
  {
    id: '5',
    userId: '2',
    title: 'Video Editing Services',
    description: 'Professional video editing for YouTube, social media, or personal projects. Color grading, transitions, and effects included.',
    category: 'Creative',
    skillsOffered: ['Video Editing', 'Color Grading'],
    skillsWanted: ['Web Development', 'SEO', 'Copywriting'],
    estimatedTime: 'Depends on project',
    createdAt: '2024-03-15'
  },
  {
    id: '6',
    userId: '3',
    title: 'Nutrition Consultation',
    description: 'Personalized nutrition advice and meal planning based on your health goals. Includes follow-up support.',
    category: 'Health & Wellness',
    skillsOffered: ['Nutrition', 'Meal Planning'],
    skillsWanted: ['Photography', 'Graphic Design', 'Social Media'],
    estimatedTime: '1 hour + follow-up',
    createdAt: '2024-03-18'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    const savedExchanges = localStorage.getItem('exchanges');
    if (savedExchanges) {
      setExchanges(JSON.parse(savedExchanges));
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Save exchanges to localStorage whenever they change
  useEffect(() => {
    if (exchanges.length > 0) {
      localStorage.setItem('exchanges', JSON.stringify(exchanges));
    }
  }, [exchanges]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (users.find(u => u.email === email)) {
      return false;
    }
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      bio: '',
      location: '',
      skills: [],
      rating: 0,
      reviewCount: 0,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const navigate = (page: Page, serviceId?: string) => {
    setCurrentPage(page);
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const addService = (service: Omit<Service, 'id' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      userId: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setServices([...services, newService]);
  };

  const deleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
  };

  const createExchange = (toServiceId: string, fromServiceId: string, message: string) => {
    if (!currentUser) return;
    const toService = services.find(s => s.id === toServiceId);
    const fromService = services.find(s => s.id === fromServiceId);
    if (!toService || !fromService) return;
    
    const newExchange: Exchange = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId: toService.userId,
      fromServiceId,
      toServiceId,
      message,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setExchanges(prev => [...prev, newExchange]);

    // Create notification for the service owner
    const newNotification: Notification = {
      id: Date.now().toString() + '_notif',
      userId: toService.userId,
      type: 'exchange_request',
      title: 'New Exchange Request!',
      message: `${currentUser.name} wants to exchange "${fromService.title}" for your "${toService.title}"`,
      read: false,
      exchangeId: newExchange.id,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };

  const updateExchangeStatus = (exchangeId: string, status: 'accepted' | 'declined') => {
    const exchange = exchanges.find(e => e.id === exchangeId);
    if (!exchange) return;

    setExchanges(exchanges.map(e => e.id === exchangeId ? { ...e, status } : e));

    // Create notification for the person who proposed the exchange
    const toService = services.find(s => s.id === exchange.toServiceId);
    const fromUser = users.find(u => u.id === exchange.toUserId);
    
    const newNotification: Notification = {
      id: Date.now().toString() + '_notif',
      userId: exchange.fromUserId,
      type: status === 'accepted' ? 'exchange_accepted' : 'exchange_declined',
      title: status === 'accepted' ? 'Exchange Accepted! 🎉' : 'Exchange Declined',
      message: status === 'accepted' 
        ? `${fromUser?.name} accepted your exchange request for "${toService?.title}"! You can now coordinate.`
        : `${fromUser?.name} declined your exchange request for "${toService?.title}".`,
      read: false,
      exchangeId: exchangeId,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications(notifications.map(n => 
      n.userId === currentUser.id ? { ...n, read: true } : n
    ));
  };

  const getUnreadNotificationCount = () => {
    if (!currentUser) return 0;
    return notifications.filter(n => n.userId === currentUser.id && !n.read).length;
  };

  const getUserById = (userId: string) => users.find(u => u.id === userId);
  const getServiceById = (serviceId: string) => services.find(s => s.id === serviceId);

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      services,
      exchanges,
      notifications,
      currentPage,
      selectedServiceId,
      login,
      register,
      logout,
      navigate,
      updateProfile,
      addService,
      deleteService,
      createExchange,
      updateExchangeStatus,
      getUserById,
      getServiceById,
      markNotificationRead,
      markAllNotificationsRead,
      getUnreadNotificationCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
