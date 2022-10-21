import AuthenticatedHeader from "../components/Header/AuthenticatedHeader";
import ChooseDifficultyPage from "./ChooseDifficultyPage";

const HomePage = () => {

  return (
    <>
      <AuthenticatedHeader />
      <ChooseDifficultyPage />
    </>
  )
}

export default HomePage;