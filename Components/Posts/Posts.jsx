import { useEffect, useState } from 'react';
import Post from './Post';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from '../../config/firebaseConfig';

const Posts = () => {
  const [posts, setPosts] = useState([]);


  let userMail = [];
  const postEmail = posts.map((post) => userMail.push(post.data().email));


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
            userMail={userMail}
          />
        );
      })}
    </div>
  );
};

export default Posts;
