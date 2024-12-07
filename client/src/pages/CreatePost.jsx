import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen mt-16'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            className='flex-1'
            placeholder='Title'
            required
            id='title'
          />
          <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='sports'>Sports</option>
            <option value='tech'>Technology</option>
            <option value='finance'>Finance</option>
            <option value='lifestyle'>Lifestyle</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-gray-400 border-dotted p-3'>
          <FileInput typp='file' accept='image/*' />
          <Button
            type='button'
            className='bg-gradient-to-r from-gray-800 to-gray-600'
            outline
            size='sm'
          >
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
        />
        <Button
          type='submit'
          className='w-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700'
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
