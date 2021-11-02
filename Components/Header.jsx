import Image from 'next/image';
import { Menu } from '@headlessui/react';
import {
  SearchIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { PlusCircleIcon, HomeIcon } from '@heroicons/react/solid';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import HeaderModal from './HeaderModal';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfile = () => {
    if (session) {
      router.push(`profile/${session.user.username}`);
    }
  };

  const [open, setOpen] = useRecoilState(modalState);

  const handleClick = () => {
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 py-2 bg-white border-b shadow md:py-0">
      <section className="flex items-center justify-between max-w-6xl mx-5 lg:mx-auto">
        <aside
          onClick={handleClick}
          className="relative hidden w-24 h-16 py-2 cursor-pointer lg:inline-grid"
        >
          <Image
            src="/assets/Instagram_logo.svg"
            layout="fill"
            objectFit="contain"
          />
        </aside>
        <aside
          onClick={handleClick}
          className="relative flex-shrink-0 block w-10 h-10 py-2 cursor-pointer lg:hidden"
        >
          <Image
            src="/assets/insta-icon.webp"
            layout="fill"
            objectFit="contain"
          />
        </aside>

        <aside className="hidden max-w-xs sm:block">
          <div className="relative flex items-center p-3 rounded-md">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 border-gray-300 rounded-md bg-gray-50 sm:text-sm border-gray focus:ring-black focus:border-black"
              placeholder="search..."
            />
          </div>
        </aside>

        <aside className="flex items-center justify-end space-x-4 ">
          <HomeIcon onClick={handleClick} className="navBtns" />

          <Menu as="div" className="relative inline-block text-left md:hidden">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <MenuIcon className="w-10 h-6 cursor-pointer md:hidden" />
              </Menu.Button>
            </div>

            <HeaderModal />
          </Menu>

          {session ? (
            <>
              <div className="relative navBtns">
                <PaperAirplaneIcon className="rotate-45 navBtns" />
                <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-1 animate-pulse">
                  5
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(!open)}
                className="navBtns"
              />
              <UserGroupIcon className="navBtns" />
              <HeartIcon className="text-red-700 navBtns" />

              <img
                src={session.user.image}
                className="hidden object-cover h-10 my-3 transition-all duration-200 ease-out rounded-full cursor-pointer md:inline-flex sm:my-0 hover:scale-95"
                loading="lazy"
                alt="user"
                onClick={handleProfile}
              />
            </>
          ) : (
            <button
              onClick={signIn}
              className="hidden px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full md:inline-flex animate-pulse"
            >
              sign in
            </button>
          )}
        </aside>
      </section>
    </header>
  );
};

export default Header;
