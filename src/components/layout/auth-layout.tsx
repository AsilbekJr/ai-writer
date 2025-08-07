import { useAuthContext } from '@/contexts/auth.context';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  return (
    <div className="h-screen grid md:grid-cols-2 ">
      <div className="bg-black text-white px-4 py-10 hidden md:flex justify-between flex-col">
        <h2 className="text-3xl">AI Writer Asisstant </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
          accusamus molestiae rem voluptas, tenetur quasi deserunt facere
          debitis nostrum quos. Quaerat sit ipsam, doloribus molestiae laborum
          est amet voluptas suscipit.
        </p>
      </div>
      <div className="flex items-center px-4">
        <Outlet />
      </div>
    </div>
  );
}
