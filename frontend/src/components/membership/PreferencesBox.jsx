import { useState } from 'react';
import tick from '../../assets/icons/tick.png';
import { useDispatch } from 'react-redux';
import { savePreference } from '../../slices/membershipDetailSlice.js';

// eslint-disable-next-line react/prop-types
const PreferencesBox = ({ title, description, img, imgBlue, selected, setSelected, filter }) => {
  const dispatch = useDispatch();
  const [mouseOnBox, setMouseOnBox] = useState(false);

  const clickHandler = () => {
    setSelected(filter);
    dispatch(savePreference(filter));
  };

  return (
    <button onClick={clickHandler} onMouseOver={() => setMouseOnBox(true)} onMouseOut={() => setMouseOnBox(false)} className={`relative w-[380px] border-2 h-[84px] rounded-md flex flex-row justify-start items-center gap-4 box-content transition-all duration-200 ease-linear hover:border-[#002684] hover:border-[2px] ${selected === filter ? 'border-[#002684] ' : 'border-[#d3d6cd]'}`}>
      <div className="ml-[16px]">
        <img src={`${selected === filter || mouseOnBox ? imgBlue : img}`} alt="" className="h-[40px] w-[40px] mr-2" />
      </div>
      <div>
        <p className={`text-[16px] text-left transition-all duration-200 ease-linear ${mouseOnBox || selected === filter ? 'text-[#002684]' : 'text-[#303236]'}`}>{title}</p>
        <p className="text-[#6a6d75] text-[15px] leading-[16px] text-left">{description}</p>
      </div>
      <img src={tick} className={`${selected === filter ? 'absolute top-2 right-2 inline-block w-[21px] h-[21px]' : 'hidden'}`}></img>
    </button>
  );
};

export default PreferencesBox;
