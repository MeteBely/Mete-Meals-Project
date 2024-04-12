import whyUsingThis from '../../components-data/whyUsingThis.js';
import WhyMealKits from './WhyMealKits.jsx';
import { useNavigate } from 'react-router-dom';

const HomeThirdSection = () => {
  const navigate = useNavigate();

  return (
    <section>
      <span className="fontCera text-[40px] font-bold text-[#002c9b] text-center block">465+ million meals shipped</span>
      <p className="fontCera text-[20px] text-center text-[#303236] mb-8 mx-auto w-[400px]">See why home cooks stick with the original American meal kit.</p>
      <div className="flex flex-wrap flex-row gap-12 justify-center items-center px-2">
        {whyUsingThis.map((item, index) => {
          return <WhyMealKits kitBox={item} key={index} />;
        })}
      </div>
      <button onClick={() => navigate('/market')} className="fontCera block m-auto rounded-3xl h-[50px] w-[180px] bg-blue-700 text-white tracking-widest mt-5">
        SEE PLANS
      </button>
    </section>
  );
};

export default HomeThirdSection;
