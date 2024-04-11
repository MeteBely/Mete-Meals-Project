import { useEffect, useState } from 'react';
import Offer from '../../components/common/Offer.jsx';
import OnTheMenuFirstSection from '../../components/on-the-menus/OnTheMenuFirstSection.jsx';
import OnTheMenuSecondSection from '../../components/on-the-menus/OnTheMenuSecondSection.jsx';
import OnTheMenuThirdSection from '../../components/on-the-menus/OnTheMenuThirdSection.jsx';
import OnTheMenuFourthSection from '../../components/on-the-menus/OnTheMenuFourthSection.jsx';
import OnTheMenuFifthSection from '../../components/on-the-menus/OnTheMenuFifthSection.jsx';
import OnTheMenuBottomSection from '../../components/on-the-menus/OnTheMenuBottomSection.jsx';
import onTheMenuFunc from '../../utils/onTheMenuFunc.js';
import { useGetMealsQuery } from '../../slices/mealsApiSlice.js';
import Loader from '../../components/common/Loader.jsx';

const OnTheMenu = () => {
  const { data: twoServingFirstMeals, isLoading } = useGetMealsQuery({ numberOfServing: '2', date: 'first week' });
  const { data: twoServingSecondMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'second week' });
  const { data: twoServingThirdMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'third week' });
  const { data: twoServingFourthMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'fourth week' });
  const { data: fourServingFirstMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'first week' });
  const { data: fourServingSecondMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'second week' });
  const { data: fourServingThirdMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'third week' });
  const { data: fourServingFourthMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'fourth week' });
  const { data: fastServingFirstMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'first week' });
  const { data: fastServingSecondMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'second week' });
  const { data: fastServingThirdMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'third week' });
  const { data: fastServingFourthMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'fourth week' });
  const { data: flexServingFirstMeals } = useGetMealsQuery({ numberOfServing: 'flex', date: 'first week' });
  const { data: flexServingSecondMeals } = useGetMealsQuery({ numberOfServing: 'flex', date: 'second week' });
  const { data: flexServingThirdMeals } = useGetMealsQuery({ numberOfServing: 'flex', date: 'third week' });
  const { data: flexServingFourthMeals } = useGetMealsQuery({ numberOfServing: 'flex', date: 'fourth week' });
  const [activeBtn, setActiveBtn] = useState('btnOne');
  const [activeMenusFirstWeek, setActiveMenusFirstWeek] = useState([]);
  const [activeMenusSecondWeek, setActiveMenusSecondWeek] = useState([]);
  const [activeMenusThirdWeek, setActiveMenusThirdWeek] = useState([]);
  const [activeMenusFourthWeek, setActiveMenusFourthWeek] = useState([]);

  //Seçilen servis butonuna göre active(gösterilecek) mealleri haftalarına göre sırasıyla activeMenusFirstWeek, activeMenusSecondWeek, activeMenusThirdWeek, activeMenusFourthWeek'e set ediyorum.
  useEffect(() => {
    if (twoServingFirstMeals && twoServingSecondMeals && twoServingThirdMeals && twoServingFourthMeals && twoServingFourthMeals !== null && twoServingThirdMeals !== null && twoServingSecondMeals !== null && twoServingFirstMeals !== null) {
      onTheMenuFunc(activeBtn, setActiveMenusFirstWeek, setActiveMenusSecondWeek, setActiveMenusThirdWeek, setActiveMenusFourthWeek, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals);
    }
  }, [activeBtn, isLoading, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals]);

  return (
    <>
      {isLoading ? (
        <div className="mt-20">
          {' '}
          <Loader />
        </div>
      ) : (
        <>
          <header className="mt-[60px] border-t border-t-gray-300">
            <div className="h-[120px] bg-[#f8f9fa] pt-[22px]">
              <Offer />
            </div>
          </header>
          <main>
            <OnTheMenuFirstSection setActiveBtn={setActiveBtn} activeBtn={activeBtn} />
            <OnTheMenuSecondSection activeMenusFirstWeek={activeMenusFirstWeek} />
            <OnTheMenuThirdSection activeMenusSecondWeek={activeMenusSecondWeek} />
            <OnTheMenuFourthSection activeMenusThirdWeek={activeMenusThirdWeek} />
            <OnTheMenuFifthSection activeMenusFourthWeek={activeMenusFourthWeek} />
          </main>
          <OnTheMenuBottomSection />
        </>
      )}
    </>
  );
};

export default OnTheMenu;
