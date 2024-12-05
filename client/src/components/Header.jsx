import { Button, Navbar, TextInput, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import logo from '../assets/arvin_logo.png';
import { useSelector } from 'react-redux';

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const activeNav = 'text-gray-800 hover:text-gray-800';
  const inActiveNav = 'text-gray-500 hover:text-gray-800';
  return (
    <Navbar className='border-b-2 border-gray-400 rounded bg-gray-300 fixed w-full top-0 left-0 z-50'>
      <Navbar.Brand as={Link} href='/'>
        <img src={logo} className='mr-3 h-9 w-9 rounded-lg' alt='Arvin Logo' />
        <span className='self-center whitespace-nowrap text-xl font-serif font-semibold dark:text-white'>
          Archives
        </span>
      </Navbar.Brand>
      <form className='lg:order-3'>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline '
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-3'>
        <Button
          className='w-12 h-10 hidden sm:inline text-xl p-0'
          pill
          color='light'
        >
          <CgDarkMode />
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
            <Dropdown.Item>Sign out</Dropdown.Item>
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
