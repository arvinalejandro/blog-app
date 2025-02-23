import { Button, Navbar, TextInput, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgDarkMode, CgSun } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';
import logo from '../assets/arvin_logo.png';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const activeNav = 'text-gray-800 dark:text-gray-600';
  const inActiveNav =
    'text-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-600';

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      if (!res.ok) {
        console.log('Cannot sign out.');
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-[1px] border-gray-300 rounded-t-none bg-gray-600 fixed w-full top-0 left-0 z-50'>
      <Navbar.Brand as={Link} to='/'>
        <img src={logo} className='mr-3 h-9 w-9 rounded-lg' alt='Arvin Logo' />
        <span className='self-center whitespace-nowrap text-xl font-serif font-semibold dark:text-white'>
          Archives
        </span>
      </Navbar.Brand>
      <form className='lg:order-3' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline bg-gray-400'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className='w-12 h-10 lg:hidden'
        color='gray'
        onClick={() => {
          navigate('/search');
        }}
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-3'>
        <Button
          className='w-12 h-10 inline text-xl p-0 focus:ring-gray-300'
          pill
          color='light'
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === 'dark' ? <CgSun /> : <CgDarkMode />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard/?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              className='bg-gradient-to-r from-gray-800 to-gray-600'
              outline
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse className='lg:order-1'>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link className={path === '/' ? activeNav : inActiveNav} to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link
            className={path === '/about' ? activeNav : inActiveNav}
            to='about'
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link
            className={path === '/projects' ? activeNav : inActiveNav}
            to='/projects'
          >
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
