import { MessageCircle, MoveRight } from 'lucide-react';
import Button from '../../atoms/button/Button';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import type React from 'react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6">
        <MessageCircle className="w-16 h-16 text-blue-500 animate-bounce" />
        <h1 className="text-4xl font-bold text-blue-600">Welcome to the Slack Clone</h1>
        <p className="text-gray-500 text-lg text-center">
          Collaborate, chat, and organize your team in real time.
        </p>
        <Button
          onClick={() => {
            navigate('/login');
          }}
          className="flex align-middle gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform font-semibold"
        >
          <MoveRight /> Go!
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
