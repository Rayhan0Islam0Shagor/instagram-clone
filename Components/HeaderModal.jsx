import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import {
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  LoginIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { PlusCircleIcon, HomeIcon } from '@heroicons/react/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

export default function HeaderModal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  const handleProfile = () => {
    if (session) {
      router.push(`profile/${session.user.username}`);
    }
  };

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="absolute bottom-0 right-0 w-56 ">
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 dark:bg-gray-800 dark:text-gray-100">
            {session && (
              <Menu.Item>
                <div
                  onClick={handleProfile}
                  className="flex items-center w-full px-2 py-2 text-sm font-semibold text-gray-900 rounded-md cursor-pointer hover:scale-95 group"
                >
                  <img
                    src={session.user.image}
                    className="object-cover h-10 my-3 mr-2 transition-all duration-200 ease-out rounded-full cursor-pointer md:hidden sm:my-0 hover:scale-95"
                    loading="lazy"
                    alt="user"
                  />
                  <div className="text-left">
                    <p class="font-bold text-gray-700 dark:text-gray-100">
                      @{session.user.username}
                    </p>
                    <p class="text-xs text-gray-500 ml-1 dark:text-gray-400">
                      welcome to instagram
                    </p>
                  </div>
                </div>
              </Menu.Item>
            )}

            <Menu.Item>
              <button
                onClick={handleClick}
                className="flex items-center w-full px-2 py-2 text-sm font-semibold text-gray-900 rounded-md hover:scale-95 group dark:text-gray-100"
              >
                <HomeIcon className="mr-2 btn" aria-hidden="true" />
                Home
              </button>
            </Menu.Item>

            {session ? (
              <>
                <Menu.Item>
                  <button className="flex items-center w-full px-2 py-2 text-sm font-semibold text-gray-900 rounded-md hover:scale-95 group dark:text-gray-100">
                    <span className="relative h-6 transition-all duration-150 ease-in-out cursor-pointer md:inline-flex hover:scale-125">
                      <PaperAirplaneIcon
                        className="h-6 mr-2 transition-all duration-150 ease-in-out rotate-45 cursor-pointer md:inline-flex hover:scale-125"
                        aria-hidden="true"
                      />
                      <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 right-2 animate-pulse">
                        5
                      </span>
                    </span>
                    Send Message
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center w-full px-2 py-2 text-sm font-semibold text-gray-900 rounded-md dark:text-gray-100 hover:scale-95 group"
                  >
                    <PlusCircleIcon className="mr-2 btn" aria-hidden="true" />
                    Add a post
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button className="flex items-center w-full px-2 py-2 text-sm font-semibold text-gray-900 rounded-md dark:text-gray-100 hover:scale-95 group">
                    <UserGroupIcon className="mr-2 btn" aria-hidden="true" />
                    People
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button className="flex items-center w-full px-2 py-2 text-sm font-semibold text-gray-900 rounded-md dark:text-gray-100 hover:scale-95 group">
                    <HeartIcon
                      className="mr-2 text-red-700 btn"
                      aria-hidden="true"
                    />
                    Hearts
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    onClick={signOut}
                    className="flex items-center w-full px-3 py-2 mr-auto text-sm font-semibold text-white bg-red-600 rounded-lg  hover:scale-95"
                  >
                    <LogoutIcon className="mr-2 btn" aria-hidden="true" />
                    sign out
                  </button>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <button
                    onClick={signIn}
                    className="flex items-center w-full px-3 py-2 mr-auto text-sm font-semibold text-white bg-blue-600 rounded-lg hover:scale-95"
                  >
                    <LoginIcon className="mr-2 btn" aria-hidden="true" />
                    sign in
                  </button>
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </div>
  );
}
