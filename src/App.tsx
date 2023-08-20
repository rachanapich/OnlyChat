import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './pages/404';
import AdminDashboard from './pages/AdminDashboard';
import ChatPage from './pages/Chat';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/groups/:groupId' element={<ChatPage />} />
        <Route path='/groups/:groupId/404' element={<NotFoundPage />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
