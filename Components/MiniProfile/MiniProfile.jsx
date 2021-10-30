import { useSession, signOut, signIn } from 'next-auth/react';

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div className="flex items-center justify-between ml-10 mt-14">
          <img
            src={session?.user?.image || '/assets/user.png'}
            className="rounded-full cursor-pointer border p-[2px] w-16 h-16"
            alt={session?.user?.name}
          />

          <div className="flex-1 mx-4">
            <h2 className="font-bold cursor-pointer">
              {session.user?.username}
            </h2>
            <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
          </div>

          <button
            onClick={session ? signOut : signIn}
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
