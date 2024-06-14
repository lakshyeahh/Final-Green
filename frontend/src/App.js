import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Login from './pages/login';
import SignUp from './pages/signUp';
import Dashboard from './pages/dashboard';
import UserPage from './pages/userPage';
import HomePage from './pages/HomePage';
import Challenge from './pages/Challenge';
import Event from './pages/Event';
import Resource from './pages/Resources';
import Carbon from './pages/Carbon';
import NewCarbon from './pages/NewCarbon';
import Waste from './pages/Waste';
import Leaderboard from './pages/Leaderboard';
import Forum from './pages/Forum';
import ProtectedRoute from './components/shared/protectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/challenges" element={<ProtectedRoute element={Challenge} />} />
            <Route path="/events" element={<ProtectedRoute element={Event} />} />
            <Route path="/resources" element={<ProtectedRoute element={Resource} />} />
            <Route path="/carbon-footprint" element={<ProtectedRoute element={Carbon} />} />
            <Route path="/carbon-footprint/new" element={<ProtectedRoute element={NewCarbon} />} />
            <Route path="/waste" element={<ProtectedRoute element={Waste} />} />
            <Route path="/leaderboard" element={<ProtectedRoute element={Leaderboard} />} />
            <Route path="/forum" element={<ProtectedRoute element={Forum} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
