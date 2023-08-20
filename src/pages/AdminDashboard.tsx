import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from 'src/components/sideBar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const getLocal = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  };

  useEffect(() => {
    getLocal();
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '3rem',
        height: '100vh',
      }}
    >
      <SideBar />
    </div>
  );
};

export default AdminDashboard;
