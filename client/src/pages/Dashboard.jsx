import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

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
    <div className='min-h-screen mt-16 flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/*Side Bar*/}
        <DashSidebar />
      </div>
      {/**Profile */}
      {tab === 'profile' && <DashProfile />}
    </div>
  );
}
