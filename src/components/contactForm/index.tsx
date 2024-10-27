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

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "name" ? capitalizeFirstLetter(value) : value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
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
          console.log("Formulario enviado con éxito!", response.status, response.text);
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
      <div className="text-center p-6 bg-primary text-whiteFont rounded-lg shadow-md">
        <h2 className="text-3xl mb-4">Gracias por comunicarte conmigo.</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-primaryButton text-whiteFont py-2 px-4 rounded-lg shadow-custom hover:bg-shadowButton transition duration-300"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-[50%] mx-auto bg-primary p-6 rounded-lg shadow-md"
    >
      <h2 className="text-4xl mb-5 text-whiteFont">{t("contactTitle")}</h2>
      <div className="md:grid md:grid-cols-2 gap-5 mb-5 flex flex-col">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t("contactName")}
          className="block w-full p-2 mt-1 rounded-md border bg-transparent border-grayFont outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t("contactEmail")}
          className="block w-full p-2 mt-1 rounded-md border bg-transparent border-grayFont outline-none"
        />
      </div>

      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        required
        placeholder={t("contactComments")}
        className="block w-full p-2 mt-1 rounded-md border bg-transparent border-grayFont h-24 outline-none"
      ></textarea>

      {emailError && <p className="text-red-500 mt-2">{t("emailError")}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading} 
          className={`${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          } bg-primaryButton text-whiteFont py-2 px-4 w-[60%] md:w-[50%] rounded-lg shadow-custom hover:bg-shadowButton transition duration-300 mt-5 flex items-center justify-center`}
        >
          {isLoading ? <Spinner /> : t("contactButton")} 
        </button>
      </div>
    </form>
  );
};

export default ContactForm;