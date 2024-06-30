import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
import Submit from './pages/Submit';
import ChanllengeDetails from './pages/ChanllengeDetails';
import Admin from './pages/admin';
import Secret from './pages/Secret';


function App() {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={accessToken ? <Navigate to="/dashboard" /> : <HomePage />} />
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
            <Route path="/submit" element={<ProtectedRoute element={Submit} />} />
            <Route path="/submit/:challengeId" element={<ProtectedRoute element={ChanllengeDetails} />} />
            <Route path="/admin" element={<ProtectedRoute element={Admin} />} />
            <Route path="/create-post/:secret" element={<ProtectedRoute element={Secret} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
