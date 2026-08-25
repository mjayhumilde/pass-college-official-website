const EmptySection = ({ icon: IconComponent, type }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-10 font-bold rounded-full">
      <div className="rounded-full p-11 bg-red-primary text-red-50 ">
        <p>No {type} at the moment...</p>
        <span className="flex justify-center text-red-50 animate-pulse">
          {IconComponent && <IconComponent size={78} />}{" "}
        </span>
      </div>
    </div>
  );
};

export default EmptySection;
