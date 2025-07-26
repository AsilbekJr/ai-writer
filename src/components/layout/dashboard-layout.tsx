import { Outlet } from 'react-router-dom';
import Navbar from '../dashboard/navbar';
import Sidebar from '../dashboard/sidebar';

export default function DashboardLayout() {
  return (
    <div className="h-screen  flex">
      <Sidebar />
      <div className="w-full overflow-hidden">
        <Navbar />
        <div className="p -4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
