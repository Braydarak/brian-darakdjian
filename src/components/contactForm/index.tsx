import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Spinner from "../spinner";

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

  if (isSubmitted) {
    return (
      <div className="bg-[#29BCB3] rounded-xl shadow-lg p-8 max-w-lg mx-auto text-center select-none ">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 font-comic-sans">
          ¡Gracias por comunicarte conmigo!
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 text-[#004d4b] font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300 font-comic-sans"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#00a59e] md:w-[60%] w-[90%] mx-auto p-8 rounded-xl shadow-2xl font-raleway"
    >
      <h2 className="text-4xl font-bold mb-8 text-yellow-400 font-RockSalt drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-center select-none">
        {t("contactTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
  );
};

export default ContactForm;