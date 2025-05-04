import { useNavigate } from "react-router-dom";

const BtnPriRed = ({ text, navi }) => {
  const navigate = useNavigate();

  return (
    <button
      className="cursor-pointer px-6 py-1 border text-red-primary
     font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-300"
      onClick={() => navigate(navi)}
    >
      {text}
    </button>
  );
};

export default BtnPriRed;
