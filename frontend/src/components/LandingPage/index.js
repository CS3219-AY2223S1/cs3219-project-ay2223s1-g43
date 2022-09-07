import Header from "../Header";
import ActionButtons from "../Header/ActionButtons";
import Content from "./Content";

const LandingPage = () => {
  return (
    <>
      <Header rightContent={<ActionButtons/> } />
      <Content />
    </>
  );
}

export default LandingPage;