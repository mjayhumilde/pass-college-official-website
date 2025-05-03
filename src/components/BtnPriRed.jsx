const BtnPriRed = ({ text }) => {
  return (
    <button
      className="cursor-pointer px-6 py-1 border text-red-primary
     font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default BtnPriRed;
