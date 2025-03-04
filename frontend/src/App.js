import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReindeerRegistration from './pages/ReindeerRegistration';
import FAQ from './pages/FAQ';
import LanguageMap from './pages/LanguageMap';
import DatabaseInfo from './pages/DatabaseInfo';
import SearchResults from './pages/SearchResults';


import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register-reindeer" element={<ReindeerRegistration />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/language-map" element={<LanguageMap />} />
              <Route path="/database-info" element={<DatabaseInfo />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;