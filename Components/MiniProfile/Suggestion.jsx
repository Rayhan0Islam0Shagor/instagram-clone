const Suggestion = ({ name, avatar, info }) => {
  return (
    <div className="flex items-center justify-between mt-3">
      <img
        src={avatar}
        className="w-10 h-10 cursor-pointer rounded-full border p-[2px]"
        alt={name}
      />

      <div className="flex-1 ml-4">
        <h2 className="text-sm font-semibold cursor-pointer">{name}</h2>
        <h3 className="text-xs text-gray-500 truncate ">
          Works at <span className="font-semibold text-gray-600">{info}</span>
        </h3>
      </div>

      <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full ">
        follow
      </button>
    </div>
  );
};

export default Suggestion;
