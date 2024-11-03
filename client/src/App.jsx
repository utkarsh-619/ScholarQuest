import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LeaderBoard from './pages/LeaderBoard';
import Assignment from './pages/Assignment';
import Redeem from './pages/Redeem';
// import Settings from './pages/Settings';
import Signin from './pages/auth/singin';
// import Profile from './pages/Profile';
// import SideMenu from './components/SideMenu';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/redeem" element={<Redeem />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signin />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
