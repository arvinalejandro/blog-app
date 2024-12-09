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
      className='border-t-[1px] border-gray-300 bg-gray-100 dark:border-gray-700'
    >
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='my-1'>
            <Link
              to='/'
              className='flex self-center whitespace-nowrap text-sm sm:text-xl'
            >
              <img
                src={logo}
                className='mr-3 h-9 w-9  rounded-lg'
                alt='Arvin Logo'
              />
              <span className='self-center whitespace-nowrap text-xl font-serif font-semibold dark:text-white'>
                Archives
              </span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  AA Archives
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.github.com/arvinalejandro'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>

                <Footer.Link
                  href='https://www.gitlab.com/arvinalejandro'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Gitlab
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Privacy Policy
                </Footer.Link>

                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by='Arvin Alejandro Archives'
            year={fullYear}
          />
          <div className='flex gap-6 sm:mt-0 sm:justify-center mt-4'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitterX} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
