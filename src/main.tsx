import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboard-home';
import { Toaster } from 'react-hot-toast';
import { AppContextProvider } from './contexts/app.context';
import { ContentContextProvider } from './contexts/content.context';
import DashboardContent from './pages/dashboard-content';
import ContentNotFound from './components/dashboard/content-not-found';
import Share from './pages/share';
import AuthLayout from './components/layout/auth-layout';
import Register from './components/auth/register';
import { AuthProvider } from './contexts/auth.context';
const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello Home</h1>,
  },
  {
    path: '/login',
    element: <h1>Login</h1>,
  },
  {
    path: '/register',
    element: <h1>Register</h1>,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'content/:id',
        element: <DashboardContent />,
        errorElement: <ContentNotFound />,
      },
    ],
  },
  {
    path: '/share/:id',
    element: <Share />,
    errorElement: <ContentNotFound />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <AuthProvider>
      <AppContextProvider>
        <ContentContextProvider>
          <RouterProvider router={router} />
        </ContentContextProvider>
      </AppContextProvider>
    </AuthProvider>
  </StrictMode>
);
