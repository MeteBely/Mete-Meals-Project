import SignUpTopSection from '../../components/user-operations/SignUpTopSection.jsx';
import SignUpMainContent from '../../components/user-operations/SignUpMainContent.jsx';
import SignUpBottomSection from '../../components/user-operations/SignUpBottomSection.jsx';
const SignUp = () => {
  return (
    <>
      <SignUpTopSection />
      <main>
        <SignUpMainContent />
        <SignUpBottomSection />
      </main>
    </>
  );
};

export default SignUp;
