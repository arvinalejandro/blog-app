/* eslint-disable react/prop-types */
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export const DeleteModal = ({
  showModal,
  onClickYes,
  modalFalse,
  modalMessage,
}) => {
  return (
    <Modal show={showModal} onClose={modalFalse} popup size='md'>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
            {modalMessage}
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={onClickYes}>
              {"Yes, I'm sure"}
            </Button>
            <Button color='gray' onClick={modalFalse}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
