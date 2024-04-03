import MealPreferences from '../data/MealPreferences.jsx';
import PreferencesBox from '../components/PreferencesBox.jsx';
import { useState } from 'react';

const ChoosePreferences = () => {
  //selected'i localde tutacağız.
  const [selected, setSelected] = useState('');
  return (
    <div className="colOneDiv flex flex-col justify-center items-center  min-[1100px]:mt-10 gap-4  min-[1100px]:pl-12">
      <h2 className="text-[22px] font-semibold text-[#303236]">1. Choose your preferences</h2>
      {MealPreferences.map((preferences, index) => {
        return <PreferencesBox selected={selected} setSelected={setSelected} key={index} filter={preferences.preference} title={preferences.title} description={preferences.description} img={preferences.img} imgBlue={preferences.imgBlue} />;
      })}
      <p className="text-[13px] leading-[18px] text-[#6a6d75]">
        Choose as many as you like. These help us make meal <br /> recommendations and personalize your experience.
      </p>
    </div>
  );
};

export default ChoosePreferences;
