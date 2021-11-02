import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useSession } from 'next-auth/react';
import Post from '../Posts/Post';
import { db } from '../../config/firebaseConfig';

const ProfileFeed = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  let userMail = [];
  const postEmail = posts.map((post) => userMail.push(post.data()));
  const filterPost = userMail.filter(
    (mail) => mail.email === session?.user?.email
  );

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <>
      {filterPost.length > 0 ? (
        <>
          <div className="h-full mt-5 md:mt-16">
            <p className="text-2xl font-bold text-center text-gray-700 dark:text-gray-400">
              You have {filterPost.length}{' '}
              {filterPost.length > 1 ? 'posts' : 'post'}
            </p>
          </div>
          {/* {filterPost.map((post) => {
            return (
              <Post
              key={post.id}
              id={post.id}
              image={post.data().image}
              avatar={post.data().avatar}
              name={post.data().username}
              caption={post.data().caption}
              timestamp={post.data()?.timestamp?.toDate()}
              />
            );
          })} */}
        </>
      ) : (
        <div className="h-full mt-10">
          <p className="text-2xl font-bold text-center text-gray-700">
            You haven't posts yet
          </p>
        </div>
      )}
    </>
  );
};

export default ProfileFeed;
