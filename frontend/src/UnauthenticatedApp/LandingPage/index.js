import Header from "../../components/Header";
import ActionButtons from "../../components/Header/ActionButtons";
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