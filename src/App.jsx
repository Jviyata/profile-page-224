// Lab 14

import React, { useState, useCallback, useMemo, lazy, Suspense, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/Navbar';
import ModeContext, { ModeProvider } from './context/ModeContext';

import girl2 from './assets/girl2.png';
import boy from './assets/boy.png';
import girl from './assets/girl.png';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AddProfilePage = lazy(() => import('./pages/AddProfilePage'));
const FetchedProfilePage = lazy(() => import('./pages/FetchedProfilePage'));
const ProfileDetailPage = lazy(() => import('./pages/ProfileDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ProfileLayout = lazy(() => import('./layouts/ProfileLayout'));

const initialProfiles = [
  {
    id: 1,
    name: "Arika Gibson",
    role: "Frontend Developer",
    year: "2025",
    major: "Computer Science",
    bio: "Full-stack developer with 5 years of experience building web applications.",
    email: "arika.gibson@example.com",
    status: "active",
    avatarUrl: girl2,
    isFeatured: true
  },
  {
    id: 2,
    name: "Julian Luzzader",
    role: "UX Designer",
    year: "2026",
    major: "UX Design",
    bio: "Creative designer specializing in user interface and experience design.",
    email: "julian.luzzader@example.com",
    status: "active",
    avatarUrl: boy,
    isFeatured: false
  },
  {
    id: 3,
    name: "Viyata Ruta",
    role: "Backend Developer",
    year: "2024",
    major: "Data Science",
    bio: "Data scientist passionate about machine learning and artificial intelligence.",
    email: "viyata.ruta@example.com",
    status: "active",
    avatarUrl: girl,
    isFeatured: false
  }
];

function AppContent() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableTitles, setAvailableTitles] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewMode, setViewMode] = useState('view');

  const { mode, toggleMode, isEditMode, setIsEditMode } = useContext(ModeContext);

  useEffect(() => {
    fetch('https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php')
      .then(res => res.json())
      .then(data => setAvailableTitles(data.titles || []))
      .catch(err => console.error('Error fetching titles:', err));
  }, []);

  const fetchFilteredProfiles = useCallback((role, search) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (role) params.append('title', role);
    if (search) params.append('name', search);

    fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?${params}`)
      .then(res => res.json())
      .then(data => setProfiles(data.data || []))
      .catch(err => setError('Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  const resetProfiles = useCallback(() => {
    setProfiles(initialProfiles);
  }, []);

  useEffect(() => {
    if (roleFilter || searchText) {
      fetchFilteredProfiles(roleFilter, searchText);
    } else {
      resetProfiles();
    }
  }, [roleFilter, searchText, fetchFilteredProfiles, resetProfiles]);

  const handleReset = useCallback(() => {
    setRoleFilter('');
    setSearchText('');
  }, []);

  const uniqueRoles = useMemo(() => 
    availableTitles.length > 0 ? availableTitles : [...new Set(profiles.map(p => p.role))],
    [profiles, availableTitles]
  );

  const appClass = useMemo(() => 
    mode === 'dark' ? `${styles.appContainer} ${styles.darkMode}` : styles.appContainer,
    [mode]
  );

  return (
    <div className={appClass}>
      <Navbar mode={mode} toggleMode={toggleMode} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      <Suspense fallback={<div className={styles.loadingMessage}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage profiles={profiles} viewMode={viewMode} mode={mode} roleFilter={roleFilter} setRoleFilter={setRoleFilter} searchText={searchText} setSearchText={setSearchText} handleReset={handleReset} uniqueRoles={uniqueRoles} setViewMode={setViewMode} loading={loading} error={error} isEditMode={isEditMode} onDeleteProfile={(id) => setProfiles(p => p.filter(pr => pr.id !== id))} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-profile" element={<AddProfilePage onAddProfile={(p) => setProfiles(prev => [...prev, p])} mode={mode} />} />
          <Route path="/other-profiles" element={<FetchedProfilePage apiProfiles={profiles} mode={mode} viewMode={viewMode} loading={loading} error={error} isEditMode={isEditMode} />} />
          <Route path="/profile" element={<ProfileLayout mode={mode} />}>
            <Route path=":id" element={<ProfileDetailPage profile={selectedProfile} mode={mode} isEditMode={isEditMode} onDeleteProfile={(id) => setProfiles(p => p.filter(pr => pr.id !== id))} allProfiles={profiles} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <AppContent />
    </ModeProvider>
  );
}