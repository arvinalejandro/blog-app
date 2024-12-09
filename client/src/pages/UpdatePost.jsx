import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublisError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublisError(data.message);
          return console.log(data.message);
        }
        if (res.ok) {
          setPublisError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  //----
  const handleUploadImage = async () => {
    try {
      if (!file)
        return setImageUploadError('Please select an image to upload.');

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };
  //-----
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) return setPublisError(data.message);
      if (res.ok) {
        setPublisError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublisError(error);
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen mt-14'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            className='flex-1'
            placeholder='Title'
            required
            id='title'
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='sports'>Sports</option>
            <option value='tech'>Technology</option>
            <option value='finance'>Finance</option>
            <option value='lifestyle'>Lifestyle</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-gray-400 border-dotted p-3'>
          <FileInput
            typp='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
            sizing='sm'
          />
          <Button
            type='button'
            className='bg-gradient-to-r from-gray-800 to-gray-600'
            outline
            size='sm'
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {publishError && <Alert color='failure'>{publishError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          value={formData.content}
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
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
