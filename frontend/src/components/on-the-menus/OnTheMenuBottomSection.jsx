import { useNavigate } from 'react-router-dom';

const OnTheMenuBottomSection = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="w-auto m-auto text-center mb-2">
        <button onClick={() => navigate('/users/sign_in?redirect=/pricing')} className="text-white bg-[#f26c29] border border-[#f26c29] px-[33px] rounded-[2px] tracking-[2px] mb-2 fontCera h-[48px] text-[15px]">
          SEE PLANS
        </button>
      </div>
    </footer>
  );
};

export default OnTheMenuBottomSection;
