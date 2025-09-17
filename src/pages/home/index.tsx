import Hero from "../../sections/hero";
import Work from "../../sections/work";
import Contact from "../contact";

const Home = () => {

  return (
    <main className="w-full h-full flex flex-col justify-center">
      <Hero />
      <Work />
      <Contact />
    </main>
  );
};

export default Home;
