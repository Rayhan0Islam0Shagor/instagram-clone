import MiniProfile from './MiniProfile/MiniProfile';
import Suggestions from './MiniProfile/Suggestions';
import Posts from './Posts/Posts';
import Stories from './Stories/Stories';
import { useSession } from 'next-auth/react';

const Feeds = () => {
  const { data: session } = useSession();

  return (
    <main
      className={`grid grid-cols-1 mx-3 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl lg:mx-auto ${
        !session && '!grid-cols-1 !max-w-3xl'
      }`}
    >
      <section className="col-span-2">
        {session && <Stories />}
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <section className="fixed top-16">
            <MiniProfile />
            <Suggestions />
          </section>
        </section>
      )}
    </main>
  );
};

export default Feeds;
