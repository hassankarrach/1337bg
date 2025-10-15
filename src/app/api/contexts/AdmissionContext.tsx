import React, { createContext, useContext, useState, useEffect } from 'react';

interface PoolerData {
  fullname: string;
  login: string;
  level: number;
  accepted: string;
  reason: string | null;
  isvalidated: string;
  cheating: boolean;
  campus?: string;
}

interface AdmissionContextType {
  poolerData: Map<string, PoolerData>;
  loading: boolean;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const AdmissionContext = createContext<AdmissionContextType | undefined>(undefined);

export const AdmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [poolerData, setPoolerData] = useState<Map<string, PoolerData>>(new Map());
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(true); // Always enabled

  useEffect(() => {
    const fetchAllPoolerData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/poolers?campus=all&pool=all');
        if (response.ok) {
          const result = await response.json();
          const dataMap = new Map<string, PoolerData>();
          
          result.data.forEach((pooler: PoolerData) => {
            dataMap.set(pooler.login, pooler);
          });
          
          setPoolerData(dataMap);
        }
      } catch (error) {
        console.error('Error fetching pooler data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Always fetch pooler data since it's always enabled
    fetchAllPoolerData();
  }, []); // Remove enabled dependency

  return (
    <AdmissionContext.Provider value={{ poolerData, loading, enabled, setEnabled }}>
      {children}
    </AdmissionContext.Provider>
  );
};

export const useAdmissionContext = () => {
  const context = useContext(AdmissionContext);
  if (context === undefined) {
    throw new Error('useAdmissionContext must be used within an AdmissionProvider');
  }
  return context;
};

export const usePoolerData = (login: string) => {
  const { poolerData, loading } = useAdmissionContext();
  
  if (!login) {
    return { poolerData: null, loading: false };
  }
  
  return { 
    poolerData: poolerData.get(login) || null, 
    loading 
  };
};
