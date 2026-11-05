import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { isValidEmail, sendContactEmail } from "../utils/sendContactEmail";

type Fields = { name: string; email: string; comments: string };
export type ContactStatus = "idle" | "sending" | "sent";

const EMPTY: Fields = { name: "", email: "", comments: "" };

// Estado y envío del formulario de contacto. `ns` es el prefijo de las
// traducciones de error (por ej. "matrix.contact").
export const useContactForm = (ns: string) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof Fields) => (e: { target: { value: string } }) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.comments.trim()) {
      setError(t(`${ns}.errorRequired`));
      return;
    }
    if (!isValidEmail(form.email)) {
      setError(t(`${ns}.errorEmail`));
      return;
    }

    setError(null);
    setStatus("sending");
    try {
      await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        comments: form.comments.trim(),
      });
      setForm(EMPTY);
      setStatus("sent");
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setError(t(`${ns}.errorSend`));
      setStatus("idle");
    }
  };

  const reset = () => setStatus("idle");

  return { form, update, status, error, submit, reset };
};
