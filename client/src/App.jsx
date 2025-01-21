import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LeaderBoard from './pages/LeaderBoard';
import Assignment from './pages/Assignment';
import Redeem from './pages/Redeem';
import Subject from './pages/Subject';
import Signin from './pages/auth/singin';
import Profile from './pages/Profile';
import TeacherDashboard from './components/teacherDashboard';
import { useDispatch, useSelector } from "react-redux";


function App() {
  const userinfo = useSelector((state) => state.userinfo);
  const teacherinfo = useSelector((state) => state.teacherinfo);
  const role = userinfo?.user?.role || teacherinfo?.teacher?.role;
  return (
    <Router>
      <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/redeem" element={<Redeem />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/teacherDashboard" element={<TeacherDashboard />} /> */}
        <Route path="/dashboard" element={role === "teacher" ? <TeacherDashboard /> : <Dashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
