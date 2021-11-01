import { useEffect, useState, useRef } from 'react';
import { Menu } from '@headlessui/react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import {
  HeartIcon as HeartIconFiller,
  BookmarkIcon as BookmarkFiller,
} from '@heroicons/react/solid';
import {
  query,
  onSnapshot,
  orderBy,
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
} from '@firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Moment from 'react-moment';
import DropDown from '../DropDown/DropDown';

const Post = ({ id, value, timestamp, image, avatar, name, caption }) => {
  const commentFieldRef = useRef(null);
  const { data: session } = useSession();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const [saved, setSaved] = useState([]);
  const [hasSaved, setHasSaved] = useState(false);

  // emoji
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [isEditing, setEditing] = useState(false);
  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }
  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={(emoji) => setComment(comment + emoji.native)}
      />
    );
  }

  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  if (isEditing) {
    commentFieldRef.current.focus();
  }

  // get liked post
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  // get saved post
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'save'), (snapshot) => {
        setSaved(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(
    () =>
      setHasSaved(
        saved.findIndex((save) => save.id === session?.user?.uid) !== -1
      ),
    [saved]
  );

  // get comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),

    [db, id]
  );

  // post like
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  // post save
  const savedPost = async () => {
    if (hasSaved) {
      await deleteDoc(doc(db, 'posts', id, 'save', session?.user?.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'save', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  // post comment
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');
    SetEmojiPicker(false);

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      avatar: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border-rounded-sm">
      <div className="flex items-center p-5">
        <img
          className="object-contain w-12 h-12 p-1 mr-3 border rounded-full cursor-pointer"
          src={avatar}
          alt={name}
        />
        <div className="flex-1">
          <p className="font-bold cursor-pointer">{name}</p>
          <Moment className="text-xs" fromNow>
            {timestamp}
          </Moment>
        </div>

        {value ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <DotsHorizontalIcon className="w-5 h-5 rounded-lg cursor-pointer focus:bg-gray-300 focus:animate-pulse " />
              </Menu.Button>
            </div>

            <DropDown id={id} />
          </Menu>
        ) : (
          <> </>
        )}
      </div>

      <img className="object-cover w-full" src={image} alt={caption} />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFiller
                onClick={likePost}
                className="text-red-600 btn"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon onClick={toggleEditing} className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          {hasSaved ? (
            <BookmarkFiller onClick={savedPost} className="text-red-600 btn" />
          ) : (
            <BookmarkIcon onClick={savedPost} className="btn" />
          )}
        </div>
      )}

      <p className="p-5 truncate">
        {likes.length > 0 && (
          <span className="mb-1 font-bold">
            {likes.length} {likes.length > 1 ? 'likes' : 'like'}
          </span>
        )}{' '}
        <span className="mr-1 font-semibold text-gray-600">{caption}</span>
      </p>

      {session && (
        <form className="relative flex items-center p-4">
          <EmojiHappyIcon
            onClick={triggerPicker}
            className="cursor-pointer h-7 animate-bounce"
          />

          <div className="absolute bottom-0 left-0 mb-[65px]">
            {emojiPicker}
          </div>

          <input
            type="text"
            ref={commentFieldRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 mx-1 border-none shadow-sm outline-none focus:ring-0 "
          />

          <button
            type="submit"
            disabled={comment.trim() === ''}
            onClick={sendComment}
            className="px-3 py-1 font-semibold text-white bg-blue-600 rounded-full disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-600"
          >
            Post
          </button>
        </form>
      )}

      {comments.length > 0 && (
        <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex items-center mb-3 space-x-2"
              >
                <img
                  className="rounded-full cursor-pointer h-8 border hover:scale-95 p-[2px]"
                  src={comment.data().avatar}
                  alt={comment.comment}
                />
                <p className="flex-1 text-sm font-semibold text-gray-500">
                  <span className="font-bold text-black cursor-pointer">
                    {comment.data().username}
                  </span>{' '}
                  {comment.data().comment}
                </p>

                <Moment fromNow className="pr-5 text-xs">
                  {comment.data()?.timestamp?.toDate()}
                </Moment>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Post;
