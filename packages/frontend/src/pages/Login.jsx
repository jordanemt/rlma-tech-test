import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoaderCircle } from 'lucide-react';

function Login() {
  const { refetch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await refetch();
    navigate('/', { replace: true });
  };

  setTimeout(() => {
    handleLogin();
  }, 3 * 1000);

  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <span className="text-2xl">Logging in...</span>
      <LoaderCircle className="animate-spin text-indigo-600" />
    </div>
  );
}

export default Login;
