/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeleteModal } from './DeleteModal';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='w-full table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table className='shadow-md' hoverable>
            <Table.Head>
              <Table.HeadCell className='bg-gray-100'>
                Date Updated
              </Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Image</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Title</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Category</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150 self-center'>
                Delete
              </Table.HeadCell>
              <Table.HeadCell className='bg-gray-150 self-center'>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {userPosts.map((post) => (
                <Table.Row
                  key={post.slug}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className='font-medium text-gray-900 dark:text-gray-200'>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category.toUpperCase()}</Table.Cell>
                  <Table.Cell className='self-center'>
                    <Button
                      type='button'
                      size='xs'
                      className='w-1/2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
                      <RiDeleteBinLine className='mr-1 h-4 w-4' />
                      Delete
                    </Button>
                  </Table.Cell>
                  <Table.Cell className='self-center'>
                    <Link
                      className='text-teal-500'
                      to={`/update-post/${post._id}`}
                    >
                      <Button
                        type='button'
                        size='xs'
                        className='w-1/2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                      >
                        <BiEditAlt className='mr-1 h-4 w-4' />
                        Edit
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <Button
              onClick={handleShowMore}
              color='light'
              className='w-60 focus:ring-gray-300 text-gray-300 self-center mx-auto my-5 text-sm py-1 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700'
            >
              Show More
            </Button>
          )}
        </>
      ) : (
        <p>No posts to display</p>
      )}
      <DeleteModal
        modalMessage='Are you sure you want to this post?'
        showModal={showModal}
        modalFalse={() => setShowModal(false)}
        onClickYes={handleDeletePost}
      />
    </div>
  );
}
