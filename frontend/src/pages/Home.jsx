import HomeFirstSection from '../components/home/HomeFirstSection.jsx';
import Meta from '../utils/Meta.jsx';
import HomeSecondSection from '../components/home/HomeSecondSection.jsx';
import HomeThirdSection from '../components/home/HomeThirdSection.jsx';
import HomeFourthSection from '../components/home/HomeFourthSection.jsx';
import PricingQuestions from '../components/home/PricingQuestions.jsx';
import SignUpBottomSection from '../components/user-operations/SignUpBottomSection.jsx';

const Home = () => {
  return (
    <main>
      <Meta />
      <HomeFirstSection />
      <HomeSecondSection />
      <HomeThirdSection />
      <HomeFourthSection />
      <PricingQuestions />
      <SignUpBottomSection />
    </main>
  );
};

export default Home;
