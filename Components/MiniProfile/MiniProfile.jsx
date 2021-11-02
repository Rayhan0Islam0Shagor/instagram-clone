import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const MiniProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  const handleProfile = () => {
    if (session) {
      router.push(`profile/${session.user.username}`);
    }
  };

  return (
    <div>
      {session ? (
        <div className="flex items-center justify-between mt-0 ml-0 md:ml-10 md:mt-14">
          <img
            src={session?.user?.image || '/assets/user.png'}
            className="rounded-full cursor-pointer border p-[2px] w-16 h-16"
            alt={session?.user?.name}
          />

          <div className="flex-1 mx-4">
            <h2
              onClick={handleProfile}
              className="font-bold cursor-pointer dark:text-gray-100"
            >
              {session.user?.username}
            </h2>
            <h3 className="text-sm text-gray-400 dark:text-gray-300">
              Welcome to Instagram
            </h3>
          </div>

          <button
            onClick={signOut}
            className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-full"
          >
            logout
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MiniProfile;
