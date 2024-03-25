import { useEffect, useState } from 'react';
import '../App.css';
import Offer from '../components/Offer';
import OnTheMenuFirstSection from '../components/OnTheMenuFirstSection';
import OnTheMenuSecondSection from '../components/OnTheMenuSecondSection';
import OnTheMenuThirdSection from '../components/OnTheMenuThirdSection';
import OnTheMenuFourthSection from '../components/OnTheMenuFourthSection';
import OnTheMenuFifthSection from '../components/OnTheMenuFifthSection';
import OnTheMenuBottomSection from '../components/OnTheMenuBottomSection';
import OnTheMenuFunc from '../utils/OnTheMenuFunc';
import axios from 'axios';
import { useGetMealsQuery } from '../slices/mealsApiSlice';
import Loader from './Loader';

const OnTheMenu = () => {
  const fetchData = async (nmbSrv, dt, setX) => {
    let { data } = await axios.get('/api/meals', {
      params: {
        numberOfServing: nmbSrv,
        date: dt,
      },
    });

    setX(data);
  };

  const { data: twoServingFirstMeals, isLoading, error } = useGetMealsQuery({ numberOfServing: '2', date: 'March 11th' });
  const { data: twoServingSecondMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'March 18th' });

  const { data: twoServingThirdMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'March 25th' });

  const { data: twoServingFourthMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'April 1st' });

  const { data: fourServingFirstMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'March 11th' });

  const { data: fourServingSecondMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'March 18th' });

  const { data: fourServingThirdMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'March 25th' });

  const { data: fourServingFourthMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'April 1st' });

  const { data: fastServingFirstMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'March 11th' });

  const { data: fastServingSecondMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'March 18th' });

  const { data: fastServingThirdMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'March 25th' });

  const { data: fastServingFourthMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'April 1st' });

  const { data: flexServingFirstMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'March 11th' });

  const { data: flexServingSecondMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'March 18th' });

  const { data: flexServingThirdMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'March 25th' });

  const { data: flexServingFourthMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'April 1st' });

  const [activeBtn, setActiveBtn] = useState('btnOne');
  const [activeMenusFirstWeek, setActiveMenusFirstWeek] = useState([]);
  const [activeMenusSecondWeek, setActiveMenusSecondWeek] = useState([]);
  const [activeMenusThirdWeek, setActiveMenusThirdWeek] = useState([]);
  const [activeMenusFourthWeek, setActiveMenusFourthWeek] = useState([]);

  useEffect(() => {
    if (twoServingFirstMeals && twoServingSecondMeals && twoServingThirdMeals && twoServingFourthMeals && twoServingFourthMeals !== null && twoServingThirdMeals !== null && twoServingSecondMeals !== null && twoServingFirstMeals !== null) {
      OnTheMenuFunc(activeBtn, setActiveMenusFirstWeek, setActiveMenusSecondWeek, setActiveMenusThirdWeek, setActiveMenusFourthWeek, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals);
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
