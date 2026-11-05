import emailjs from "emailjs-com";

export type ContactMessage = {
  name: string;
  email: string;
  comments: string;
};

// Envía el formulario de contacto por EmailJS (lo usan todas las experiencias)
export const sendContactEmail = (message: ContactMessage) =>
  emailjs.send(
    "service_cql8h85",
    "template_oc0qmu5",
    message,
    "-lQgcCglETOfMjV6O"
  );

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
