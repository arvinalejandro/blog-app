import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setTab(tabFromUrl);
    // console.log(tabFromUrl);
  }, [location]);

  return (
    <div className='min-h-screen mt-14 flex flex-col md:flex-row'>
      <div className='md:w-56 py-3'>
        {/*Side Bar*/}
        <DashSidebar />
      </div>
      {/**Profile */}
      {tab === 'profile' && <DashProfile />}
      {/**Posts */}
      {tab === 'posts' && <DashPost />}
      {/**Users */}
      {tab === 'users' && <DashUsers />}
      {/**Comments */}
      {tab === 'comments' && <DashComments />}
      {/**Components */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}
