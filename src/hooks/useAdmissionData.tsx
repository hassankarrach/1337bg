import { useState, useEffect } from 'react';

interface AdmissionData {
  accepted: string | boolean;
  reason: string | null;
  isvalidated: string | boolean;
  cheating: boolean;
  level: number;
}

interface UseAdmissionDataProps {
  login: string;
  enabled: boolean;
}

export const useAdmissionData = ({ login, enabled }: UseAdmissionDataProps) => {
  const [admissionData, setAdmissionData] = useState<AdmissionData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !login) {
      setAdmissionData(null);
      return;
    }

    const fetchAdmissionData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admission?login=${login}`);
        if (response.ok) {
          const data = await response.json();
          setAdmissionData(data.admission);
        } else {
          setAdmissionData(null);
        }
      } catch (error) {
        console.error('Error fetching admission data:', error);
        setAdmissionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, [login, enabled]);

  return { admissionData, loading };
};
