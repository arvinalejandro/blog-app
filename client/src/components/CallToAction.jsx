import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-gray-400 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to know check it out?</h2>
        <p className='text-gray-400 my-2'>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Lacus sagittis
          etiam inceptos, congue mauris nibh montes a himenaeos.
        </p>
        <Button
          gradientDuoTone='purpleToPink'
          className='rounded-tl-xl rounded-bl-none'
        >
          <a
            href='https://www.google.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Just click me
          </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://st.depositphotos.com/1907633/3138/i/380/depositphotos_31387239-stock-photo-businessman-working-on-modern-technology.jpg' />
      </div>
    </div>
  );
}
