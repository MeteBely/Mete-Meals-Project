import ChoosePreferences from '../../components/membership/ChoosePreferences.jsx';
import SelectPlan from '../../components/membership/SelectPlan.jsx';
import PersonalizeTitle from '../../components/membership/PersonalizeTitle.jsx';

const Pricing = () => {
  return (
    <>
      <PersonalizeTitle />
      <div className="bg-white pb-4 m-auto w-auto min-[1100px]:w-[1075px] h-full min-[1100px]:h-[680px] flex flex-col justify-center items-center min-[1100px]:flex-row min-[1100px]:justify-evenly min-[1100px]:items-start gap-2 min-[1100px]:gap-12 fontCera">
        <ChoosePreferences />
        <SelectPlan />
      </div>
    </>
  );
};

export default Pricing;
