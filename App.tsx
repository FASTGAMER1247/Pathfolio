
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { DashboardApp } from './components/DashboardApp';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { PublicPortfolio } from './components/PublicPortfolio';
// FIX: Use AppUser for more specific typing of logged-in user.
import type { User, AppUser } from './types';
import { Toast } from './components/Toast';
import { useDataStore } from './hooks/useStudentData';

// Helper to safely get user from localStorage on initial load
const getInitialUser = (): AppUser | null => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse stored user:", e);
      // If parsing fails, the data is corrupt, so remove it.
      localStorage.removeItem('currentUser');
      return null;
    }
  }
  return null;
};


const App: React.FC = () => {
  // FIX: Removed getAchievementsByStudentId as it's no longer used in this component.
  const { login, register, logout, getUserById } = useDataStore();
  // FIX: Initialize user state directly from localStorage to prevent flicker and state loss on refresh.
  const [user, setUser] = useState<AppUser | null>(getInitialUser());
  const [view, setView] = useState<'app' | 'public_portfolio'>('app');
  // FIX: Removed publicProfileData state as the PublicPortfolio component fetches its own data.
  const [authView, setAuthView] = useState<'landing' | 'signin' | 'signup'>('landing');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Client-side routing for public portfolio
    const path = window.location.pathname;
    if (path.startsWith('/portfolio/')) {
      const userId = path.split('/')[2];
      const profile = getUserById(userId);
      if (profile && profile.role === 'student') {
        // FIX: The PublicPortfolio component handles its own data fetching.
        // We just need to set the view.
        setView('public_portfolio');
      }
    }
    // User state is now handled by initial state, so the effect to set user is no longer needed.
  }, [getUserById]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignIn = (email: string, pass: string): boolean => {
    const loggedInUser = login(email, pass);
    if (loggedInUser) {
      setUser(loggedInUser);
      showToast(`Welcome back, ${loggedInUser.name}!`);
      setAuthView('landing');
      return true;
    }
    showToast('Invalid email or password.');
    return false;
  };
  
  // FIX: Updated newUser type to accept specific student/faculty properties for registration.
  const handleSignUp = (newUser: Omit<AppUser, 'id'> & { password?: string }) => {
    const registeredUser = register(newUser);
    setUser(registeredUser);
    showToast(`Welcome, ${registeredUser.name}! Your account has been created.`);
    setAuthView('landing');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    showToast('You have been logged out.');
  };

  const renderContent = () => {
    // FIX: PublicPortfolio fetches its own data and doesn't accept props.
    if (view === 'public_portfolio') {
      return <PublicPortfolio />;
    }

    if (user) {
      return <DashboardApp user={user} onLogout={handleLogout} showToast={showToast} />;
    }

    switch (authView) {
      case 'signin':
        return <SignIn onSignIn={handleSignIn} onSwitchToSignUp={() => setAuthView('signup')} onDemoLogin={setUser} />;
      case 'signup':
        return <SignUp onSignUp={handleSignUp} onSwitchToSignIn={() => setAuthView('signin')} />;
      case 'landing':
      default:
        return <LandingPage onSignIn={() => setAuthView('signin')} onSignUp={() => setAuthView('signup')} />;
    }
  };

  return (
    <>
      {renderContent()}
      <Toast message={toastMessage} />
    </>
  );
};

export default App;
