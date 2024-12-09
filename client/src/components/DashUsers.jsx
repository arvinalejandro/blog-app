/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeleteModal } from './DeleteModal';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers');
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) fetchUsers();
  }, [currentUser._id]);

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='w-full table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table className='shadow-md' hoverable>
            <Table.Head>
              <Table.HeadCell className='bg-gray-150'>
                Date Created
              </Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>
                Profile Picture
              </Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Username</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>
                Email Address
              </Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Admin</Table.HeadCell>
              <Table.HeadCell className='bg-gray-150'>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {users.map((user) => (
                <Table.Row
                  key={user._id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-12 h-12 rounded-full object-cover bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900 dark:text-gray-200'>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      type='button'
                      size='xs'
                      className='w-1/2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
        <p>No Users to display</p>
      )}
      <DeleteModal
        modalMessage='Are you sure you want to this user?'
        showModal={showModal}
        modalFalse={() => setShowModal(false)}
        onClickYes={handleDeleteUser}
      />
    </div>
  );
}
