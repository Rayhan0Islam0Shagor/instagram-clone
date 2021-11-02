import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Post from './Post';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from '../../config/firebaseConfig';

const Posts = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  let postMail = [];
  let userMail = [];

  posts.map((post) => {
    postMail.push(post.data().email);
  });

  postMail.map((mail) => {
    if (mail === session?.user.email) {
      userMail.push(mail);
    }
  });

  const defaultEmail = 'a@gmail.com';

  const filteredMail = (userMail[0] || defaultEmail) === session?.user.email;

  // console.log('Post', postMail, 'usermail', userMail, 'filter', filteredMail);

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
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            image={post.data().image}
            avatar={post.data().avatar}
            name={post.data().username}
            caption={post.data().caption}
            timestamp={post.data()?.timestamp?.toDate()}
            value={filteredMail}
          />
        );
      })}
    </div>
  );
};

export default Posts;
