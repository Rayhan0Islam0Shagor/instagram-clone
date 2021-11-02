import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom';
import { CameraIcon, XIcon } from '@heroicons/react/outline';

import { db, storage } from '../../config/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { useSession } from 'next-auth/react';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
import { ThemeState } from '../../atoms/ThemeAtom';

const Modal = () => {
  const { data: session } = useSession();

  const filePickerRef = useRef(null);

  const [open, setOpen] = useRecoilState(modalState);
  const [theme] = useRecoilState(ThemeState);

  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadPost = async (e) => {
    if (caption.trim() === '') return;
    if (selectedFile === null) return alert('Please select a file to upload');

    if (loading) return;

    setLoading(true);

    // TODO 1. create a post and add to firestore 'posts' collection
    // TODO 2. get the post id for the created post
    // TODO 3. upload the image to firestore storage with the post id
    // TODO 4. get a download url from fb storage and update the original post with image

    // collection ref
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      fullname: session.user.name,
      email: session.user.email,
      caption: caption,
      avatar: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (Snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
    setCaption('');
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease out duration-300"
            enterFrom="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 " />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <div className="relative">
                    <div className="absolute top-0 right-0 flex items-center justify-center mt-1 mr-1 text-gray-800 transition-all duration-200 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-800 hover:text-white h-7 w-7">
                      <XIcon
                        className="w-6 h-6 "
                        onClick={() => setSelectedFile(null)}
                      />
                    </div>

                    <img src={selectedFile} alt="image" />
                  </div>
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer "
                  >
                    <CameraIcon
                      className="w-6 h-6 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload a photo
                  </Dialog.Title>

                  <div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>

                  <div className="mt-3">
                    <input
                      required
                      onChange={(e) => setCaption(e.target.value)}
                      type="text"
                      className="w-full text-center border-none focus:ring-0"
                      placeholder="Enter a caption..."
                    />
                  </div>
                </div>

                <div className="mt-5sm:mt-6">
                  <button
                    onClick={uploadPost}
                    disabled={selectedFile === null && caption.trim() === ''}
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {loading ? 'uploading post' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
