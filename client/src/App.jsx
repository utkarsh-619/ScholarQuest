// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Redeem from './pages/Redeem';
import Signin from './pages/auth/singin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/redeem" element={<Redeem />} />
        <Route path="/signup" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
