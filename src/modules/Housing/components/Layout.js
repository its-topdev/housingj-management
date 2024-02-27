import { dashboardConstants } from '@/lib';
import { memo } from 'react';
import { Outlet } from 'react-router';
import { Footer, Toasts } from '@/components/layout';
import TopNav from './TopNav';
import AppBar from './AppBar';

const { USERS_GROUP } = dashboardConstants;

const Layout = ({ user, isAuthenticated }) => (
  <div className="w-full flex flex-col min-h-screen bg-gray-50">
    <AppBar user={user} isAuthenticated={isAuthenticated} />
    {isAuthenticated && user?.group_id !== USERS_GROUP ? (
      <TopNav user={user} />
    ) : null}
    <Outlet />
    <Footer />
    <Toasts />
  </div>
);

export default memo(Layout);
