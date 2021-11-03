import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import swal from 'sweetalert';

import { doc, deleteDoc } from '@firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function DropDown({ id }) {
  const removeTodo = async (id) => {
    const dltDoc = await doc(db, 'posts', id);

    await deleteDoc(dltDoc);

    swal({
      title: 'DELETE',
      text: 'Post Deleted!! :(',
      icon: 'success',
      button: 'Okay',
    });
  };

  return (
    <div className="absolute top-0 right-0 z-50 mt-8">
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                className={`group flex rounded-md items-center w-full px-2 py-2 text-sm dark:bg-gray-800 dark:text-gray-100`}
              >
                <EditInactiveIcon
                  className="w-5 h-5 mr-2 btn"
                  aria-hidden="true"
                />
                Edit
              </button>
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              <button
                onClick={() => removeTodo(id)}
                className={`group flex rounded-md items-center w-full px-2 py-2 text-sm dark:bg-gray-800 dark:text-gray-100`}
              >
                <DeleteInactiveIcon
                  className="w-5 h-5 mr-2 btn"
                  aria-hidden="true"
                />
                Delete
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#FFB830"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#FF2442"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#FF2442" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#FF2442" strokeWidth="2" />
    </svg>
  );
}
