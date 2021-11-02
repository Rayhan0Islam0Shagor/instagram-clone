import { useEffect, useState } from 'react';
import faker from 'faker';
import Story from './Story';
import { useSession } from 'next-auth/react';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => {
      return {
        id: i,

        ...faker.helpers.contextualCard(),
      };
    });
    setStories(suggestions);
  }, []);

  return (
    <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border-gray-200 rounded-sm scrollbar-thumb-gray-800 dark:scrollbar-thumb-gray-100 scrollbar-thin dark:bg-gray-800 dark:text-gray-50">
      {session && (
        <Story avatar={session.user.image} username={session.user.username} />
      )}

      {stories.map((profile) => {
        return (
          <Story
            key={profile.id}
            id={profile.id}
            avatar={profile.avatar}
            username={profile.username}
          />
        );
      })}
    </div>
  );
};

export default Stories;
