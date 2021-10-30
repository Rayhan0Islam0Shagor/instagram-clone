const Story = ({ id, username, avatar }) => {
  return (
    <div>
      <img
        className="object-contain p-[1.5px] transition duration-200 ease-out transform rounded-full cursor-pointer w-14 h-14 hover:scale-110 border-2 border-red-600"
        src={avatar}
        alt={username}
      />

      <p className="text-xs text-center truncate w-14">{username}</p>
    </div>
  );
};

export default Story;
