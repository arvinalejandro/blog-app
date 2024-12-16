import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className='text-md text-gray-500'>
        Welcome to the Project Page, a dynamic template designed to showcase and
        highlight my upcoming or ongoing projects. This page provides a visually
        appealing and organized way to present my work, complete with
        interactive features for easy navigation.
      </p>
      <CallToAction />
    </div>
  );
}
