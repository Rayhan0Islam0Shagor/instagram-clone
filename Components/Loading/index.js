import BounceLoader from 'react-spinners/BounceLoader';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <BounceLoader className="" size={150} />
    </div>
  );
};

export default Loading;
