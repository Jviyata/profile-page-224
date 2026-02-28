import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

export function useUserProfile(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setUser({ id: userId, name: 'John Doe', email: 'john@example.com', bio: 'Developer' });
      setLoading(false);
    }, 500);
  }, [userId]);

  return { user, loading, error };
}
