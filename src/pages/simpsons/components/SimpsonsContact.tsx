import { useTranslation } from "react-i18next";
import { contactChannels } from "../../../data/contactChannels";
import { useContactForm } from "../../../hooks/useContactForm";

const PHONE = { label: "phone", value: "+34 622 655 789", href: "tel:+34622655789" };

const inputClass =
  "mt-1.5 w-full rounded-xl border-[3px] border-black bg-white px-4 py-2.5 font-Raleway font-semibold text-black placeholder:text-black/35 shadow-[3px_3px_0_#000] transition-shadow focus:shadow-[3px_3px_0_#00a59e] focus:outline-none";

const labelClass = "block font-Raleway text-sm font-black text-black";

const SimpsonsContact = () => {
  const { t } = useTranslation();
  const { form, update, status, error, submit, reset } =
    useContactForm("simpsons.contact");
  const chalkLine = t("simpsons.contact.chalk");
  const channels = [...contactChannels.filter((c) => c.label === "email"), PHONE];

  return (
    <section id="simpsons-contact" className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid grid-cols-1 w-full max-w-7xl items-start gap-10 lg:grid-cols-2">
        {/* Pizarrón de castigo */}
        <div data-reveal>
          <div className="relative rounded-2xl border-[10px] border-[#8a5a2b] bg-[#2f5d3a] p-6 shadow-[8px_8px_0_#000] sm:p-8">
            <h2 className="font-RockSalt text-2xl leading-snug text-white sm:text-3xl">
              {t("simpsons.contact.title")}
            </h2>
            <p className="mt-3 font-RockSalt text-sm text-white/75 sm:text-base">
              {t("simpsons.contact.subtitle")}
            </p>

            <div className="mt-6 space-y-2" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <p
                  key={i}
                  className="simpsons-chalk truncate font-RockSalt text-xs text-white/55 sm:text-sm"
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  {chalkLine}.
                </p>
              ))}
            </div>

            <div className="mt-8 border-t-2 border-dashed border-white/25 pt-6">
              <p className="font-RockSalt text-xs text-[#ffd90f]">{t("simpsons.contact.direct")}</p>
              <ul className="mt-3 space-y-2 font-Raleway">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      className="group inline-flex flex-wrap items-baseline gap-2 font-bold text-white transition-colors hover:text-[#ffd90f]"
                    >
                      <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                        {channel.label === "phone" ? t("simpsons.contact.phone") : channel.label}
                      </span>
                      <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-[#ffd90f]">
                        {channel.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tiza y borrador apoyados en el marco */}
            <div className="absolute -bottom-[10px] right-8 flex translate-y-1/2 gap-3" aria-hidden="true">
              <span className="h-2.5 w-10 rounded-full border-2 border-black bg-white" />
              <span className="h-4 w-14 rounded border-2 border-black bg-[#ff7eb6]" />
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div
          data-reveal
          className="rounded-3xl border-[3px] border-black bg-[#ffd90f] p-6 shadow-[8px_8px_0_#000] sm:p-8"
        >
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-4" role="status">
              <p className="font-RockSalt text-2xl text-black">{t("simpsons.contact.success")}</p>
              <p className="font-Raleway text-lg font-semibold text-black/75">
                {t("simpsons.contact.successText")}
              </p>
              <button
                type="button"
                onClick={reset}
                className="simpsons-btn mt-2 rounded-full border-[3px] border-black bg-white px-6 py-2 font-Raleway font-black text-black"
              >
                {t("simpsons.contact.sendAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <h3 className="font-RockSalt text-xl text-black sm:text-2xl">
                {t("simpsons.contact.formTitle")}
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  {t("simpsons.contact.name")}
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder={t("simpsons.contact.namePlaceholder")}
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  {t("simpsons.contact.email")}
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder={t("simpsons.contact.emailPlaceholder")}
                    className={inputClass}
                  />
                </label>
              </div>
              <label className={labelClass}>
                {t("simpsons.contact.message")}
                <textarea
                  name="comments"
                  rows={5}
                  value={form.comments}
                  onChange={update("comments")}
                  placeholder={t("simpsons.contact.messagePlaceholder")}
                  className={`${inputClass} resize-y`}
                />
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border-2 border-black bg-white px-3 py-2 font-Raleway text-sm font-bold text-[#d61f1f]"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="simpsons-btn w-full rounded-full border-[3px] border-black bg-[#ff3b3b] px-10 py-3 font-Raleway text-base font-black text-white disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <span className="matrix-dots">{t("simpsons.contact.sending")}</span>
                ) : (
                  t("simpsons.contact.send")
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpsonsContact;
