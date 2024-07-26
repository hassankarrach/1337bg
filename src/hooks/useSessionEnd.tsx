"use client";
import { useEffect, useCallback } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useSessionEnd = () => {
  const { data: session, status } = useSession();

  const handleLogout = useCallback(() => {
    toast.info("Your session has expired. Logging out...", {
      autoClose: 5000,
      onClose: () => signOut(),
    });
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const loginTime = session.loginTime;
      const endTime = loginTime + 2 * 60 * 60 * 1000; // 2 hours, after login.
      const currentTime = Date.now();
      const timeRemaining = endTime - currentTime;

      if (timeRemaining <= 0) {
        handleLogout();
      } else {
        const timer = setTimeout(() => {
          toast.info("Session expired. Logging out...", {
            autoClose: 5000,
            onClose: () => signOut(),
          });
        }, timeRemaining);
        return () => clearTimeout(timer);
      }
    }
  }, [session, status, handleLogout]);
};

export default useSessionEnd;
