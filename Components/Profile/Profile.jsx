import { useSession } from 'next-auth/react';
import ProfileFeed from './ProfileFeeds';
import MiniProfile from '../MiniProfile/MiniProfile';

const Profile = () => {
  const { data: session } = useSession();

  return (
    <section className="grid grid-cols-1 mx-3 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl lg:mx-auto">
      <section className="col-span-1 ">
        <section className="p-0 mt-5 md:p-2">
          <MiniProfile />
          <div className="mt-6 ml-0 md:ml-10">
            <h1 className="font-bold text-gray-900 dark:text-gray-100">
              Username:{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-400 ">
                @{session?.user?.username}
              </span>
            </h1>
            <h1 className="font-bold text-gray-900 dark:text-gray-100">
              Name:{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-400">
                {session?.user?.name}
              </span>
            </h1>
            <h1 className="font-bold text-gray-900 dark:text-gray-100">
              Mail:{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-400">
                {session?.user?.email}
              </span>
            </h1>
          </div>
        </section>
      </section>
      <section className="col-span-1 md:col-span-2">
        <ProfileFeed />
      </section>
    </section>
  );
};

export default Profile;
