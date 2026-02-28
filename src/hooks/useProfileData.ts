import { useState, useEffect, useCallback } from 'react';

interface Profile {
  id: string | number;
  name: string;
  role: string;
  year: string;
  major: string;
  bio: string;
  email: string;
  status: string;
  avatarUrl: string;
  isFeatured: boolean;
}

export function useProfileData(initialProfiles: Profile[]) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [apiProfiles, setApiProfiles] = useState<Profile[]>(initialProfiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableTitles, setAvailableTitles] = useState<string[]>([]);

  // Fetch available titles from API
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch('https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php');
        const data = await response.json();
        setAvailableTitles(data.titles || []);
      } catch (err) {
        console.error('Error fetching titles:', err);
        setAvailableTitles(['Frontend Developer', 'UX Designer', 'Backend Developer']);
      }
    };
    fetchTitles();
  }, []);

  // Fetch all profiles from API
  useEffect(() => {
    const fetchAllProfiles = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php');
        const data = await response.json();
        setApiProfiles(data.data || initialProfiles);
        setProfiles(data.data || initialProfiles);
        setError(null);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to fetch profiles');
      } finally {
        setLoading(false);
      }
    };
    fetchAllProfiles();
  }, []);

  // Fetch filtered profiles from API
  const fetchFilteredProfiles = useCallback(async (roleFilter: string, searchText: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter) params.append('title', roleFilter);
      if (searchText) params.append('name', searchText);
      params.append('page', '1');
      params.append('limit', '10');

      const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setProfiles(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching filtered profiles:', err);
      setError('Failed to fetch filtered profiles');
    } finally {
      setLoading(false);
    }
  }, []);

  const addProfile = useCallback((newProfile: Profile) => {
    setProfiles(prev => [...prev, newProfile]);
  }, []);

  const deleteProfile = useCallback((profileId: string | number) => {
    setProfiles(prev => prev.filter(profile => profile.id !== profileId));
  }, []);

  const resetProfiles = useCallback(() => {
    setProfiles(apiProfiles);
  }, [apiProfiles]);

  return {
    profiles,
    apiProfiles,
    loading,
    error,
    availableTitles,
    fetchFilteredProfiles,
    addProfile,
    deleteProfile,
    resetProfiles
  };
}
