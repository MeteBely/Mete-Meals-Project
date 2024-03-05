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

  const [twoServingFirstMeals, setTwoServingFirstMeals] = useState([]);
  const [twoServingSecondMeals, setTwoServingSecondMeals] = useState([]);
  const [twoServingThirdMeals, setTwoServingThirdMeals] = useState([]);
  const [twoServingFourthMeals, setTwoServingFourthMeals] = useState([]);
  const [fourServingFirstMeals, setFourServingFirstMeals] = useState([]);
  const [fourServingSecondMeals, setFourServingSecondMeals] = useState([]);
  const [fourServingThirdMeals, setFourServingThirdMeals] = useState([]);
  const [fourServingFourthMeals, setFourServingFourthMeals] = useState([]);
  const [fastServingFirstMeals, setFastServingFirstMeals] = useState([]);
  const [fastServingSecondMeals, setFastServingSecondMeals] = useState([]);
  const [fastServingThirdMeals, setFastServingThirdMeals] = useState([]);
  const [fastServingFourthMeals, setFastServingFourthMeals] = useState([]);
  const [flexServingFirstMeals, setFlexServingFirstMeals] = useState([]);
  const [flexServingSecondMeals, setFlexServingSecondMeals] = useState([]);
  const [flexServingThirdMeals, setFlexServingThirdMeals] = useState([]);
  const [flexServingFourthMeals, setFlexServingFourthMeals] = useState([]);

  useEffect(() => {
    fetchData('2', 'March 11th', setTwoServingFirstMeals);
    fetchData('2', 'March 18th', setTwoServingSecondMeals);
    fetchData('2', 'March 25th', setTwoServingThirdMeals);
    fetchData('2', 'April 1st', setTwoServingFourthMeals);
    fetchData('4', 'March 11th', setFourServingFirstMeals);
    fetchData('4', 'March 18th', setFourServingSecondMeals);
    fetchData('4', 'March 25th', setFourServingThirdMeals);
    fetchData('4', 'April 1st', setFourServingFourthMeals);
    fetchData('1', 'March 11th', setFastServingFirstMeals);
    fetchData('1', 'March 18th', setFastServingSecondMeals);
    fetchData('1', 'March 25th', setFastServingThirdMeals);
    fetchData('1', 'April 1st', setFastServingFourthMeals);
    fetchData('x', 'March 11th', setFlexServingFirstMeals);
    fetchData('x', 'March 18th', setFlexServingSecondMeals);
    fetchData('x', 'March 25th', setFlexServingThirdMeals);
    fetchData('x', 'April 1st', setFlexServingFourthMeals);
  }, []);
  const [activeBtn, setActiveBtn] = useState('btnOne');
  const [activeMenusFirstWeek, setActiveMenusFirstWeek] = useState(twoServingFirstMeals);
  const [activeMenusSecondWeek, setActiveMenusSecondWeek] = useState(twoServingSecondMeals);
  const [activeMenusThirdWeek, setActiveMenusThirdWeek] = useState(twoServingThirdMeals);
  const [activeMenusFourthWeek, setActiveMenusFourthWeek] = useState(twoServingFourthMeals);

  useEffect(() => {
    if (twoServingFirstMeals.length > 0) {
      OnTheMenuFunc(activeBtn, setActiveMenusFirstWeek, setActiveMenusSecondWeek, setActiveMenusThirdWeek, setActiveMenusFourthWeek, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals);
    }
  }, [activeBtn, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals]);

  return (
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
  );
};

export default OnTheMenu;
