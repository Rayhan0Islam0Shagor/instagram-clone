import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { StoryState } from '../../atoms/storyModalAtom';
import StoryModal from '../Modal/StoryModal';

const Story = ({ id, username, avatar }) => {
  const [open, setOpen] = useRecoilState(StoryState);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div>
        <div className="relative">
          <img
            alt={username}
            src={avatar}
            width="1200"
            height="630"
            className={`  transition-opacity duration-200 object-contain p-[1.5px] ease-out transform rounded-full cursor-pointer w-14 h-14 hover:scale-110 border-2 border-red-600 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-100 animate-pulse dark:bg-gray-900" />
          )}
        </div>

        <p className="text-xs text-center truncate w-14">{username}</p>
      </div>

      {/* <StoryModal username={username} avatar={avatar} /> */}
    </>
  );
};

export default Story;
