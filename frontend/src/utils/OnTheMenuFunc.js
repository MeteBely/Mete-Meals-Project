const OnTheMenuFunc = (activeBtn, setActiveMenusFirstWeek, setActiveMenusSecondWeek, setActiveMenusThirdWeek, setActiveMenusFourthWeek, twoServingFirstMeals, twoServingSecondMeals, twoServingThirdMeals, twoServingFourthMeals, fourServingFirstMeals, fourServingSecondMeals, fourServingThirdMeals, fourServingFourthMeals, fastServingFirstMeals, fastServingSecondMeals, fastServingThirdMeals, fastServingFourthMeals, flexServingFirstMeals, flexServingSecondMeals, flexServingThirdMeals, flexServingFourthMeals) => {
  if (activeBtn === 'btnOne') {
    setActiveMenusFirstWeek(twoServingFirstMeals);
    setActiveMenusSecondWeek(twoServingSecondMeals);
    setActiveMenusThirdWeek(twoServingThirdMeals);
    setActiveMenusFourthWeek(twoServingFourthMeals);
  } else if (activeBtn === 'btnTwo') {
    setActiveMenusFirstWeek(fourServingFirstMeals);
    setActiveMenusSecondWeek(fourServingSecondMeals);
    setActiveMenusThirdWeek(fourServingThirdMeals);
    setActiveMenusFourthWeek(fourServingFourthMeals);
  } else if (activeBtn === 'btnThree') {
    setActiveMenusFirstWeek(fastServingFirstMeals);
    setActiveMenusSecondWeek(fastServingSecondMeals);
    setActiveMenusThirdWeek(fastServingThirdMeals);
    setActiveMenusFourthWeek(fastServingFourthMeals);
  } else if (activeBtn === 'btnFour') {
    setActiveMenusFirstWeek(flexServingFirstMeals);
    setActiveMenusSecondWeek(flexServingSecondMeals);
    setActiveMenusThirdWeek(flexServingThirdMeals);
    setActiveMenusFourthWeek(flexServingFourthMeals);
  }
};

export default OnTheMenuFunc;
