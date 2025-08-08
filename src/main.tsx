import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
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
import Login from './components/auth/login';
import ProtectedRoute from './components/auth/protected-route';
import './i18n';
const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello Home</h1>,
  },

  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
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
