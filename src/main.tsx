import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboard-home';
import { AppContextProvider } from './contexts/app.context';
console.log(import.meta.env.VITE_GEMINI_AI_KEY);
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
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
