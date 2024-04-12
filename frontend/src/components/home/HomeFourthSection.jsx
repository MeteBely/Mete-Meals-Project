import DividerIcon from '../common/DividerIcon.jsx';
import commentBoxDatas from '../../components-data/commentBox.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeFourthSection = () => {
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [sayac, setSayac] = useState(0);
  const navigate = useNavigate();

  //Her 4 saniyede bir sırayla kullanıcı yorumu(5 adet) gösterilir, sonuncu yorum 8 saniye gösterilir ve tekrar başa sarılır.
  setTimeout(() => {
    if (sayac !== 5) {
      setUserName(commentBoxDatas[sayac].userName);
      setComment(commentBoxDatas[sayac].userComment);
      setSayac((prev) => prev + 1);
    } else {
      setSayac(0);
    }
  }, 4000);

  return (
    <section className="images mt-[64px] w-full">
      <div className="firstImage w-full h-[550px] relative">
        <img src="https://media.blueapron.com/assets/registration/homepage/cooking-pot.webp?height=600&quality=90" className="w-full h-[550px] object-cover" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 bg-white w-[400px]  md:w-[614px] h-[450px] rounded-md">
          <p className="fontCera pt-[60px] text-[16px]  md:text-[20px] text-center text-[#00a0df] font-bold">Celebrating 21 years of happy customers</p>
          <p className="fontChronicle text-[22px] md:text-[28px] text-center text-[#002c9b] mt-[28px] leading-normal">{comment}</p>
          <p className="text-center text-[#00a0df] my-4 absolute -translate-x-1/2 top-[350px] left-1/2">
            <DividerIcon />
          </p>
          <p className="absolute -translate-x-1/2 top-[410px] left-1/2 fontCera text-[#002c9b] md:text-[16px] text-[12px] text-center pb-[39px] font-bold tracking-[2.4px]">— {userName}</p>
        </div>
      </div>
      <div className="secondImage relative sm:w-2/3 w-full h-[300px] m-auto mt-16 fontCera">
        <img src="https://media.blueapron.com/assets/registration/homepage/gnocchi-ingredients.webp?height=400&quality=90" className="w-full h-[300px] object-cover" />
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white w-2/3 h-[230px] rounded-sm">
          <p className="text-[32px] font-bold text-center mb-[4px] text-[#002c9b] mt-8">Get started now with membership</p>
          <p className="text-center mb-[15px] text-[#6a6d75] text-[18px]">
            for as little as <span className="font-bold text-[#00a0df] text-[16px]">$7.99 per serving</span>
          </p>
          <button onClick={() => navigate('/users/sign_in?redirect=/pricing')} className="fontCera rounded-3xl m-auto mt-4 block	h-[50px] w-[225px] bg-blue-700 text-white tracking-widest">
            SEE PLANS
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeFourthSection;
