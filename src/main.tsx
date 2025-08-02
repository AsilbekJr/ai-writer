import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboard-home';
import { Toaster } from 'react-hot-toast';
import { AppContextProvider } from './contexts/app.context';
import { ContentContextProvider } from './contexts/content.context';
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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <AppContextProvider>
      <ContentContextProvider>
        <RouterProvider router={router} />
      </ContentContextProvider>
    </AppContextProvider>
  </StrictMode>
);
