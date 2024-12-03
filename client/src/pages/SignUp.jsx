import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*Left*/}
        <div className='flex-1'>
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-black via-gray-700 to-gray-500  rounded-lg text-white'>
              AA
            </span>
          </Link>
          <p className='text-sm mt-5'>
            This blog site lets you easily create, publish, and archive articles
            to share your ideas with the world.
            <br /> <span className='font-medium'>To get started:</span> <br />
            Register with your email and password or sign up using your Google
            account. Begin sharing your stories today!
          </p>
        </div>
        {/*Right*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='text'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='text' placeholder='Password' id='password' />
            </div>
            <Button
              className='bg-gradient-to-r from-gray-800 to-gray-600'
              type='submit'
            >
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className='font-medium'>Have an account?</span>
            <Link to='/sign-in' className='text-blue-400'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
