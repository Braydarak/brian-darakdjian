import { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setFormData({ name: "", email: "", comments: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-[50%] mx-auto bg-primary p-6 rounded-lg shadow-md "
    >
      <h2 className="text-4xl mb-5 text-whiteFont ">{t('contactTitle')}</h2>
      <div className="md:grid md:grid-cols-2 gap-5 mb-5 flex flex-col">
        <input
          type="text"
          name={t("contactName")}
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t("contactName")}
          className="block w-full p-2 mt-1 rounded-md border bg-transparent border-grayFont"
        />

        <input
          type="email"
          name={t("contactEmail")}
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t("contactEmail")}
          className="block w-full p-2 mt-1 rounded-md border bg-transparent border-grayFont"
        />
      </div>

      <textarea
        name={t("contactComments")}
        value={formData.comments}
        onChange={handleChange}
        required
        placeholder={t("contactComments")}
        className="block w-full p-2 mt-1 rounded-md border bg-transparent border-grayFont h-24"
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primaryButton text-whiteFont py-2 px-4 w-[60%] md:w-[50%] rounded-lg shadow-custom hover:bg-shadowButton transition duration-300 mt-5"
        >
          {t("contactButton")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
