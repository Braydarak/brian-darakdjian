import Hero from "../../sections/hero";
import Work from "../../sections/work";
import Contact from "../contact";

const Home = () => {

  return (
    <main className="w-full h-full flex flex-col ml-0 md:ml-5 md:items-center justify-center">
      <Hero />
      <Work />
      <Contact />
    </main>
  );
};

export default Home;
