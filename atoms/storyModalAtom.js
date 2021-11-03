import { atom } from 'recoil';

export const StoryState = atom({
  key: 'storyState',
  default: 0,
  people: {
    id: 1,
    name: 'John Doe',
    avatar: '',
  },
});
