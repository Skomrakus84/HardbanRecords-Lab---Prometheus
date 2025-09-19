// FIX: This file was a placeholder. Added the main App component with routing, layout, and context providers. This resolves module resolution errors in other files that import it.
import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider, ToastProvider } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import OnboardingPage from './pages/OnboardingPage';
import SuspenseLoader from './components/ui/SuspenseLoader';
import ToastContainer from './components/ui/Toast';
import Tutorial from './components/onboarding/Tutorial';

// Lazy load pages for better performance
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const UserDashboard = React.lazy(() => import('./pages/UserDashboard'));
const MusicManagementPage = React.lazy(() => import('./pages/music/MusicManagementPage'));
const PublishingManagementPage = React.lazy(() => import('./pages/publishing/PublishingManagementPage'));
const EcommerceManagementPage = React.lazy(() => import('./pages/ecommerce/EcommerceManagementPage'));
const MarketingManagementPage = React.lazy(() => import('./pages/marketing/MarketingManagementPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ComingSoonPage = React.lazy(() => import('./pages/ComingSoonPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));

const AppContent: React.FC = () => {
  const { user, showTutorialFor, setShowTutorialFor } = useContext(AuthContext);

  if (!user) {
    return <OnboardingPage />;
  }

  return (
    <>
      {showTutorialFor && <Tutorial role={showTutorialFor} onClose={() => setShowTutorialFor(null)} />}
      <div className="flex bg-dark-bg min-h-screen text-gray-200">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><SuspenseLoader /></div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/music/*" element={<MusicManagementPage />} />
              <Route path="/publishing/*" element={<PublishingManagementPage />} />
              <Route path="/ecommerce/*" element={<EcommerceManagementPage />} />
              <Route path="/marketing/*" element={<MarketingManagementPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              {/* Fallback for any other marketing pages not explicitly defined */}
              <Route path="/marketing/*" element={<ComingSoonPage title="Marketing Tool" />} />

            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;