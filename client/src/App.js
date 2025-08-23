import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Suites from './pages/Properties';
import SuiteDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import StaffPortal from './pages/StaffPortal';
import Access from './pages/Access';
import './index.css';

// Component to conditionally render navbar and footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Routes that should not have navbar and footer (admin/staff pages)
  const adminRoutes = ['/admin', '/admin-login', '/staff', '/access'];
  const isAdminRoute = adminRoutes.includes(location.pathname);
  
  if (isAdminRoute) {
    return (
      <div className="App min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    );
  }
  
  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suites" element={<Suites />} />
          <Route path="/suites/:id" element={<SuiteDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/staff" element={<StaffPortal />} />
          <Route path="/access" element={<Access />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App; 