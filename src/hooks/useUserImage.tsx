import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface UserImageHookResult {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

// Cache to store fetched images and avoid duplicate API calls
const imageCache = new Map<string, string | null>();
const pendingRequests = new Map<string, Promise<string | null>>();

export const useUserImage = (username: string, fallbackUrl?: string | null): UserImageHookResult => {
  const [imageUrl, setImageUrl] = useState<string | null>(fallbackUrl || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // If we already have a valid image URL, don't fetch
    if (fallbackUrl && fallbackUrl !== null && fallbackUrl !== '' && fallbackUrl !== 'null') {
      setImageUrl(fallbackUrl);
      return;
    }

    // If no session or username, can't fetch
    if (!session?.accessToken || !username) {
      return;
    }

    // Check cache first
    if (imageCache.has(username)) {
      const cachedUrl = imageCache.get(username);
      setImageUrl(cachedUrl || null);
      return;
    }

    // Check if there's already a pending request for this user
    if (pendingRequests.has(username)) {
      pendingRequests.get(username)?.then(setImageUrl);
      return;
    }

    const fetchUserImage = async (): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.intra.42.fr/v2/users/${username}`, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const userData = await response.json();
        
        // Extract image URL from 42 API response
        const userImageUrl = userData?.image?.versions?.small || userData?.image?.link || null;
        
        // Cache the result
        imageCache.set(username, userImageUrl);
        
        return userImageUrl;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user image';
        setError(errorMessage);
        
        // Cache null result to avoid repeated failed requests
        imageCache.set(username, null);
        
        return null;
      } finally {
        setIsLoading(false);
        // Remove from pending requests
        pendingRequests.delete(username);
      }
    };

    // Store the promise to avoid duplicate requests
    const promise = fetchUserImage();
    pendingRequests.set(username, promise);
    
    promise.then(setImageUrl);
  }, [username, fallbackUrl, session?.accessToken]);

  return { imageUrl, isLoading, error };
};

// Alternative utility function for direct API calls
export const fetchUserImageFromAPI = async (username: string, accessToken: string): Promise<string | null> => {
  // Check cache first
  if (imageCache.has(username)) {
    return imageCache.get(username) || null;
  }

  try {
    const response = await fetch(`https://api.intra.42.fr/v2/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const userData = await response.json();
    const imageUrl = userData?.image?.versions?.small || userData?.image?.link || null;
    
    // Cache the result
    imageCache.set(username, imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.error('Error fetching user image from 42 API:', error);
    
    // Cache null result to avoid repeated failed requests
    imageCache.set(username, null);
    
    return null;
  }
};

// Clear cache function (useful for testing or memory management)
export const clearImageCache = () => {
  imageCache.clear();
  pendingRequests.clear();
};
