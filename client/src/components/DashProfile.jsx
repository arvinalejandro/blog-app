/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Button, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { PassPop } from './PassPop';
import { DeleteModal } from './DeleteModal';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import {
  updateFailure,
  updateSuccess,
  updateStart,
  refresh,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
} from '../redux/user/userSlice';

export default function DashProfile() {
  const {
    currentUser,
    error: errorMessage,
    loading,
  } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    dispatch(refresh());
  }, []);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    /*
        rules_version = '2';

            // Craft rules based on data in your Firestore database
            // allow write: if firestore.get(
            //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
            service firebase.storage {
            match /b/{bucket}/o {
                match /{allPaths=**} {
                allow read;
                allow read, write: if 
                request.resource.size < 2 * 1024 *1024 &&
                request.resource.contentType.matches('image/.*')
                }
            }
            }
        */
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageFileUploadError(
          'Could not upload image(File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFail(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFail(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      dispatch(updateFailure('No changes made.'));
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setFormData({});
        setUpdateUserSuccess('User profile updated.');
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mb-8'
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-gray-400 border-8 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <PassPop onChange={handleChange} />
        <Button
          className='w-2/3 mx-auto bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700'
          type='submit'
          outline
          isProcessing={loading}
          disabled={imageFileUploading || loading}
        >
          Update
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button
              type='button'
              className='w-2/3 mx-auto bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700'
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex flex-row-reverse justify-between mt-5 '>
        <span
          className='cursor-pointer text-xs font-semibold font-sans mx-auto'
          onClick={() => {
            setShowModal(true);
          }}
        >
          Delete Account
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}

      {errorMessage && (
        <Alert color='failure' className='mt-5'>
          {errorMessage}
        </Alert>
      )}
      <DeleteModal
        showModal={showModal}
        modalMessage='Are you sure you want to delete your account?'
        modalFalse={() => setShowModal(false)}
        onClickYes={handleDeleteUser}
      />
    </div>
  );
}
