/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeleteModal } from './DeleteModal';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments');
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) fetchComments();
  }, [currentUser._id]);

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const res = await fetch(`/api/user/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='w-full table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table className='shadow-md' hoverable>
            <Table.Head>
              <Table.HeadCell className='bg-gray-150'>
                Date Created
              </Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Comment</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>
                Number of Likes
              </Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Post Id</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>User Id</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {comments.map((comment) => (
                <Table.Row
                  key={comment._id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900 dark:text-gray-200'>
                    {comment.userId}
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      type='button'
                      size='xs'
                      className='w-1/2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                    >
                      <RiDeleteBinLine className='mr-1 h-4 w-4' />
                      Delete
                    </Button>
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
        <p>No Comments to display</p>
      )}
      <DeleteModal
        modalMessage='Are you sure you want to this comment?'
        showModal={showModal}
        modalFalse={() => setShowModal(false)}
        onClickYes={handleDeleteComment}
      />
    </div>
  );
}
