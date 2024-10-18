import ContactForm from "../../components/contactForm";
import Header from "../../components/header";

const Contact = () => {


  return (
    <div className="justify-center flex h-screen items-center w-screen bg-black text-white">
      <Header />
      <div className="w-full h-full justify-center contents">
       <ContactForm />
      </div>
    </div>
  );
};

export default Contact;