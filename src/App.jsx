// Lab 14

import React, { useState, useCallback, useMemo, lazy, Suspense, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { useProfileData } from './hooks/useProfileData';
import { useFilterState } from './hooks/useFilterState';

// Import components
import Navbar from './components/Navbar';
import ModeContext, { ModeProvider } from './context/ModeContext';

// Import images
import girl2 from './assets/girl2.png';
import boy from './assets/boy.png';
import girl from './assets/girl.png';

// Lazy load pages
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
  // Use custom hooks
  const {
    profiles,
    loading,
    error,
    availableTitles,
    fetchFilteredProfiles,
    addProfile,
    deleteProfile,
    resetProfiles
  } = useProfileData(initialProfiles);

  const {
    roleFilter,
    setRoleFilter,
    searchText,
    setSearchText,
    reset: resetFilters
  } = useFilterState();

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewMode, setViewMode] = useState('view');

  const { mode, toggleMode, isEditMode, setIsEditMode } = useContext(ModeContext);

  // Call filtered API when filters change
  useEffect(() => {
    if (roleFilter || searchText) {
      fetchFilteredProfiles(roleFilter, searchText);
    } else {
      resetProfiles();
    }
  }, [roleFilter, searchText, fetchFilteredProfiles, resetProfiles]);

  const handleReset = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleProfileClick = useCallback((profile) => {
    setSelectedProfile(profile);
  }, []);

  const uniqueRoles = useMemo(() => 
    availableTitles.length > 0 ? availableTitles : [...new Set(profiles.map(profile => profile.role))], 
    [profiles, availableTitles]
  );

  const appClass = useMemo(() => 
    mode === 'dark' ? `${styles.appContainer} ${styles.darkMode}` : styles.appContainer,
    [mode]
  );

  const navbarProps = useMemo(() => ({
    mode,
    toggleMode,
    isEditMode,
    setIsEditMode
  }), [mode, toggleMode, isEditMode, setIsEditMode]);

  return (
    <div className={appClass}>
      <Navbar {...navbarProps} />
      <Suspense fallback={<div className={styles.loadingMessage}>Loading...</div>}>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                profiles={profiles}
                viewMode={viewMode}
                mode={mode}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                searchText={searchText}
                setSearchText={setSearchText}
                handleReset={handleReset}
                uniqueRoles={uniqueRoles}
                setViewMode={setViewMode}
                onProfileClick={handleProfileClick}
                loading={loading}
                error={error}
                isEditMode={isEditMode}
                onDeleteProfile={deleteProfile}
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route 
            path="/add-profile" 
            element={<AddProfilePage onAddProfile={addProfile} mode={mode} />} 
          />
          <Route 
            path="/other-profiles" 
            element={
              <FetchedProfilePage 
                apiProfiles={profiles}
                mode={mode}
                viewMode={viewMode}
                onProfileClick={handleProfileClick}
                loading={loading}
                error={error}
                isEditMode={isEditMode}
              />
            } 
          />
          
          <Route 
            path="/profile" 
            element={<ProfileLayout mode={mode} />}
          >
            <Route 
              path=":id" 
              element={
                <ProfileDetailPage 
                  profile={selectedProfile} 
                  mode={mode} 
                  isEditMode={isEditMode} 
                  onDeleteProfile={deleteProfile}
                  allProfiles={profiles}
                />
              } 
            />
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