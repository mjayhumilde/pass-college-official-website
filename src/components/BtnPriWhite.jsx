import { useNavigate } from "react-router-dom";

const BtnPriWhite = ({ text, route }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(route)}
      className="cursor-pointer border font-bold py-2 sm:py-1 sm:px-8 w-full sm:w-auto hover text-white 
     hover:bg-white hover:text-[rgb(128,0,0)] transition-colors duration-500 rounded-full"
    >
      {text}
    </button>
  );
};

export default BtnPriWhite;
