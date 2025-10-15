import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationCenterProps {
  className?: string;
}

const NotificationContainer = styled.div`
  position: relative;
`;

const NotificationButton = styled.button<{ $hasUnread: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .bell-icon {
    color: ${props => props.$hasUnread ? 'var(--main_color)' : 'rgba(255, 255, 255, 0.7)'};
    font-size: 20px;
  }
`;

const NotificationBadge = styled.span<{ $count: number }>`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
  min-width: 16px;
  height: 16px;
  display: ${props => props.$count > 0 ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 2px;
  animation: ${props => props.$count > 0 ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const NotificationDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  max-height: 400px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d30 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(8px)' : 'translateY(0)'};
  transition: all 0.3s ease;
  overflow: hidden;
`;

const NotificationHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: white;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  button {
    background: transparent;
    border: none;
    color: var(--main_color);
    cursor: pointer;
    font-size: 0.9rem;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  }
`;

const NotificationList = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--main_color);
    border-radius: 3px;
  }
`;

const NotificationItem = styled.div<{ $isRead: boolean }>`
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.$isRead ? 'transparent' : 'rgba(102, 126, 234, 0.05)'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${props => props.$isRead ? 'transparent' : 'var(--main_color)'};
  }
`;

const NotificationContent = styled.div`
  .title {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 4px;
  }

  .message {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    margin-bottom: 6px;
  }

  .time {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
  }
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const NotificationCenter: React.FC<NotificationCenterProps> = ({ className }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!session) return;

    setLoading(true);
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();

      if (res.ok) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } else {
        console.error('Failed to fetch notifications:', data.error);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId?: string) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notificationId,
          markAllAsRead: !notificationId,
        }),
      });

      if (res.ok) {
        await fetchNotifications(); // Refresh notifications
      } else {
        console.error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
    
    // Handle different notification types
    if (notification.type === 'feedback' && notification.data) {
      try {
        const data = JSON.parse(notification.data);
        toast.info(`New feedback from ${data.giverName}: "${data.feedbackText}"`);
      } catch (error) {
        console.error('Error parsing notification data:', error);
      }
    }
  };

  const formatTimeAgo = (isoDate: string): string => {
    const now = new Date();
    const then = new Date(isoDate);
    const diffMs = now.getTime() - then.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "just now";
  };

  // Initial fetch when component mounts or session changes
  useEffect(() => {
    if (session) {
      fetchNotifications();
    }
  }, [session]);

  // Additional fetch when dropdown is opened
  useEffect(() => {
    if (session && isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Poll for new notifications every 15 seconds when user is logged in
  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 15000); // Check every 15 seconds for better responsiveness
    
    return () => clearInterval(interval);
  }, [session]);

  // Check for notifications when page becomes visible again
  useEffect(() => {
    if (!session) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, check for new notifications
        fetchNotifications();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [session]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-notification-center]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if (!session) return null;

  return (
    <NotificationContainer className={className} data-notification-center>
      <NotificationButton
        $hasUnread={unreadCount > 0}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell className="bell-icon" />
        <NotificationBadge $count={unreadCount}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </NotificationBadge>
      </NotificationButton>

      <NotificationDropdown $isOpen={isOpen}>
        <NotificationHeader>
          <h3>Notifications</h3>
          {unreadCount > 0 && (
            <button onClick={() => markAsRead()}>
              Mark all as read
            </button>
          )}
        </NotificationHeader>

        <NotificationList>
          {loading ? (
            <EmptyState>Loading notifications...</EmptyState>
          ) : notifications.length === 0 ? (
            <EmptyState>No notifications yet</EmptyState>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                $isRead={notification.is_read}
                onClick={() => handleNotificationClick(notification)}
              >
                <NotificationContent>
                  <div className="title">{notification.title}</div>
                  <div className="message">{notification.message}</div>
                  <div className="time">{formatTimeAgo(notification.created_at)}</div>
                </NotificationContent>
              </NotificationItem>
            ))
          )}
        </NotificationList>
      </NotificationDropdown>
    </NotificationContainer>
  );
};

export default NotificationCenter;
