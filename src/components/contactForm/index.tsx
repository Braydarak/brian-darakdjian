import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Spinner from "../spinner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const capitalizeFirstLetter = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "name" ? capitalizeFirstLetter(value) : value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    setIsLoading(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      comments: formData.comments,
    };

    emailjs
      .send(
        "service_cql8h85",
        "template_oc0qmu5",
        templateParams,
        "-lQgcCglETOfMjV6O"
      )
      .then(
        (response) => {
          console.log("Mensaje enviado:", response);
          setIsSubmitted(true);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error al enviar el formulario:", error);
          alert("Hubo un problema al enviar el mensaje, intenta nuevamente.");
          setIsLoading(false);
        }
      );

    setFormData({ name: "", email: "", comments: "" });
  };

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const info = document.querySelector<HTMLElement>(".contact-info");
      const form = document.querySelector<HTMLElement>(".contact-form");

      if (!info || !form) return;

      const tweenInfo = gsap.fromTo(
        info,
        { opacity: 0, x: -120 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", paused: true, immediateRender: false }
      );

      const tweenForm = gsap.fromTo(
        form,
        { opacity: 0, x: 120 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", paused: true, immediateRender: false }
      );

      ScrollTrigger.create({
        trigger: info,
        start: "top 95%",
        end: "top 60%",
        onEnter: () => tweenInfo.play(),
        onLeave: () => {},
        onEnterBack: () => tweenInfo.play(),
        onLeaveBack: () => tweenInfo.reverse(),
        onRefresh: () => {
          const rect = info.getBoundingClientRect();
          const inView = rect.top <= window.innerHeight * 0.95;
          gsap.set(info, inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 });
        },
        invalidateOnRefresh: true,
      });

      ScrollTrigger.create({
        trigger: form,
        start: "top 95%",
        end: "top 60%",
        onEnter: () => tweenForm.play(),
        onLeave: () => {},
        onEnterBack: () => tweenForm.play(),
        onLeaveBack: () => tweenForm.reverse(),
        onRefresh: () => {
          const rect = form.getBoundingClientRect();
          const inView = rect.top <= window.innerHeight * 0.95;
          gsap.set(form, inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 });
        },
        invalidateOnRefresh: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (isSubmitted) {
    return (
      <div className="bg-[#29BCB3] rounded-xl shadow-lg p-6 sm:p-8 max-w-lg mx-auto text-center select-none">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 font-RockSalt">
          ¡Woo-hoo! ¡Mensaje enviado! 
        </h2>
        <p className="text-white mb-6 font-raleway text-base sm:text-lg">
          Como diría Bart: "¡Ay, caramba! Tu mensaje llegó perfectamente"
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 text-[#004d4b] font-bold py-3 px-4 sm:px-6 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300 font-raleway text-sm sm:text-base"
        >
          Volver al inicio
        </button>
      </div>
    );
  }


  return (
    <div ref={rootRef} className="w-[95%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Contact Info Section */}
      <div className="contact-info bg-[#00a59e] rounded-xl shadow-lg p-6 sm:p-8 text-center flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-yellow-400 font-RockSalt drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          {t("contactTitle")}
        </h2>
        <p className="text-base sm:text-lg text-yellow-300 mb-6 lg:mb-8 font-raleway italic">
          {t("contactSubtitle")}
        </p>
        <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 text-white font-bold text-lg sm:text-xl">
           <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
             <span className="font-raleway text-lg sm:text-xl break-all">braydarak@gmail.com</span>
           </div>
           <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
             </svg>
             <span className="font-raleway text-lg sm:text-xl">+34 622 655 789</span>
           </div>
         </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="contact-form bg-[#00a59e] w-full p-6 sm:p-8 rounded-xl shadow-2xl font-raleway"
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-yellow-400 font-RockSalt text-center select-none drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
            {t("contactFormTitle")}
          </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t("contactName")}
          className="rounded-lg border-4 border-yellow-400 bg-[#8DD2CD] px-4 py-3 text-[#004d4b] placeholder-white font-semibold focus:outline-none focus:border-yellow-600 transition duration-300 font-comic-sans"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t("contactEmail")}
          className="rounded-lg border-4 border-yellow-400 bg-[#8DD2CD] px-4 py-3 text-[#004d4b] placeholder-white font-semibold focus:outline-none focus:border-yellow-600 transition duration-300 font-comic-sans"
        />
      </div>

      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        required
        placeholder={t("contactComments")}
        className="rounded-lg border-4 border-yellow-400 w-full bg-[#8DD2CD] px-4 py-3 text-[#004d4b] placeholder-white font-semibold focus:outline-none focus:border-yellow-600 transition duration-300 h-28 resize-none font-comic-sans"
      ></textarea>

      {emailError && (
        <p className="text-red-600 font-bold mt-2 font-comic-sans">
          {t("emailError")}
        </p>
      )}

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
          } bg-yellow-400 text-[#004d4b] font-bold py-3 px-12 rounded-full shadow-lg transition-transform duration-300 flex items-center justify-center font-comic-sans`}
        >
          {isLoading ? <Spinner /> : t("contactButton")}
        </button>
      </div>
    </form>
    </div>
  );
};

export default ContactForm;