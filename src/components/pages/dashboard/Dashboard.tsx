import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import Button from '../../atoms/button/Button';
import { useAuth } from '../../../context/AuthContext';

function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuth();
  console.log(user, 'user');
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      // Optionally handle error
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Dashboard!{user?.displayName}</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Dashboard;
