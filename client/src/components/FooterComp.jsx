import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import logo from '../assets/arvin_logo.png';
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsGithub,
  BsLinkedin,
} from 'react-icons/bs';

const fullYear = new Date().getFullYear;
export default function FooterComp() {
  return (
    <Footer
      container
      className='border-t-[1px] border-gray-300 bg-gray-100 dark:border-gray-700 px-6 py-3 rounded-t-none'
    >
      <div className='w-full text-center'>
        <div className='w-full justify-between sm:flex sm:items-center sm:justify-between px-10'>
          <div className='my-1'>
            <Link
              to='/'
              className='flex self-center whitespace-nowrap text-sm sm:text-xl'
            >
              <img
                src={logo}
                className='mr-4 h-9 w-9  rounded-lg'
                alt='Arvin Logo'
              />
              <span className='self-center whitespace-nowrap text-xl font-serif font-semibold dark:text-white'>
                Archives
              </span>
            </Link>
          </div>
          <Footer.LinkGroup className='dark:text-gray-400'>
            <Footer.Link href='#'>About</Footer.Link>
            <Footer.Link href='#'>Privacy Policy</Footer.Link>
            <Footer.Link href='#'>Licensing</Footer.Link>
            <Footer.Link href='#'>Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />

        <div className='mt-4 flex space-x-4 sm:mt-0 sm:justify-center'>
          <Footer.Copyright
            href='#'
            by='Arvin Alejandro Archives'
            year={fullYear}
          />
          <Footer.Icon href='#' icon={BsFacebook} />
          <Footer.Icon href='#' icon={BsInstagram} />
          <Footer.Icon href='#' icon={BsTwitterX} />
          <Footer.Icon href='#' icon={BsGithub} />
          <Footer.Icon href='#' icon={BsLinkedin} />
        </div>
      </div>
    </Footer>
  );
}
