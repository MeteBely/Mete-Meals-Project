import '../App.css';
import HomeFirstSection from '../components/HomeFirstSection.jsx';
import Meta from '../components/Meta.jsx';
import HomeSecondSection from '../components/HomeSecondSection.jsx';
import HomeThirdSection from '../components/HomeThirdSection.jsx';
import HomeFourthSection from '../components/HomeFourthSection.jsx';
import PricingQuestions from '../components/PricingQuestions.jsx';
const Home = () => {
  return (
    <main>
      <Meta />
      <HomeFirstSection />
      <HomeSecondSection />
      <HomeThirdSection />
      <HomeFourthSection />
      <PricingQuestions />
    </main>
  );
};

export default Home;
