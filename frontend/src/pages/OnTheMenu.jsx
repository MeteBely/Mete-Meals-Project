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
  // const [twoServingFirstMeals, setTwoServingFirstMeals] = useState([]);
  const { data: twoServingSecondMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'March 18th' });
  // const [twoServingSecondMeals, setTwoServingSecondMeals] = useState([]);
  const { data: twoServingThirdMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'March 25th' });
  // const [twoServingThirdMeals, setTwoServingThirdMeals] = useState([]);
  const { data: twoServingFourthMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'April 1st' });
  // const [twoServingFourthMeals, setTwoServingFourthMeals] = useState([]);
  const { data: fourServingFirstMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'March 11th' });
  // const [fourServingFirstMeals, setFourServingFirstMeals] = useState([]);
  const { data: fourServingSecondMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'March 18th' });
  // const [fourServingSecondMeals, setFourServingSecondMeals] = useState([]);
  const { data: fourServingThirdMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'March 25th' });
  // const [fourServingThirdMeals, setFourServingThirdMeals] = useState([]);
  const { data: fourServingFourthMeals } = useGetMealsQuery({ numberOfServing: '4', date: 'April 1st' });
  // const [fourServingFourthMeals, setFourServingFourthMeals] = useState([]);
  const { data: fastServingFirstMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'March 11th' });
  // const [fastServingFirstMeals, setFastServingFirstMeals] = useState([]);
  const { data: fastServingSecondMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'March 18th' });
  // const [fastServingSecondMeals, setFastServingSecondMeals] = useState([]);
  const { data: fastServingThirdMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'March 25th' });
  // const [fastServingThirdMeals, setFastServingThirdMeals] = useState([]);
  const { data: fastServingFourthMeals } = useGetMealsQuery({ numberOfServing: '1', date: 'April 1st' });
  // const [fastServingFourthMeals, setFastServingFourthMeals] = useState([]);
  const { data: flexServingFirstMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'March 11th' });
  // const [flexServingFirstMeals, setFlexServingFirstMeals] = useState([]);
  const { data: flexServingSecondMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'March 18th' });
  // const [flexServingSecondMeals, setFlexServingSecondMeals] = useState([]);
  const { data: flexServingThirdMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'March 25th' });
  // const [flexServingThirdMeals, setFlexServingThirdMeals] = useState([]);
  const { data: flexServingFourthMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'April 1st' });
  // const [flexServingFourthMeals, setFlexServingFourthMeals] = useState([]);

  useEffect(() => {
    // fetchData('2', 'March 11th', setTwoServingFirstMeals);
    // fetchData('2', 'March 18th', setTwoServingSecondMeals);
    // fetchData('2', 'March 25th', setTwoServingThirdMeals);
    // fetchData('2', 'April 1st', setTwoServingFourthMeals);
    // fetchData('4', 'March 11th', setFourServingFirstMeals);
    // fetchData('4', 'March 18th', setFourServingSecondMeals);
    // fetchData('4', 'March 25th', setFourServingThirdMeals);
    // fetchData('4', 'April 1st', setFourServingFourthMeals);
    // fetchData('1', 'March 11th', setFastServingFirstMeals);
    // fetchData('1', 'March 18th', setFastServingSecondMeals);
    // fetchData('1', 'March 25th', setFastServingThirdMeals);
    // fetchData('1', 'April 1st', setFastServingFourthMeals);
    // fetchData('x', 'March 11th', setFlexServingFirstMeals);
    // fetchData('x', 'March 18th', setFlexServingSecondMeals);
    // fetchData('x', 'March 25th', setFlexServingThirdMeals);
    // fetchData('x', 'April 1st', setFlexServingFourthMeals);
  }, []);
  const [activeBtn, setActiveBtn] = useState('btnOne');
  const [activeMenusFirstWeek, setActiveMenusFirstWeek] = useState([]);
  const [activeMenusSecondWeek, setActiveMenusSecondWeek] = useState([]);
  const [activeMenusThirdWeek, setActiveMenusThirdWeek] = useState([]);
  const [activeMenusFourthWeek, setActiveMenusFourthWeek] = useState([]);

  useEffect(() => {
    if (twoServingFirstMeals && twoServingSecondMeals && twoServingThirdMeals && twoServingFourthMeals && twoServingFourthMeals !== null && twoServingThirdMeals !== null && twoServingSecondMeals !== null && twoServingFirstMeals !== null) {
      // setActiveMenusFirstWeek(twoServingFirstMeals);
      // setActiveMenusSecondWeek(twoServingSecondMeals);
      // setActiveMenusThirdWeek(twoServingThirdMeals);
      // setActiveMenusFourthWeek(twoServingFourthMeals)
      OnTheMenuFunc(activeBtn, setActiveMenusFirstWeek, setActiveMenusSecondWeek, setActiveMenusThirdWeek, setActiveMenusFourthWeek, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals);
    }
  }, [activeBtn, isLoading, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals]);
  return (
    <>
      {isLoading ? (
        <Loader />
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
