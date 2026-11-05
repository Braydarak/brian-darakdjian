import { useTranslation } from "react-i18next";
import { contactChannels } from "../../../data/contactChannels";
import { useContactForm } from "../../../hooks/useContactForm";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 font-Raleway text-white placeholder:text-white/30 caret-[#ffe81f] transition-colors focus:border-[#4fc3f7] focus:outline-none focus:ring-1 focus:ring-[#4fc3f7]";

const labelClass =
  "block font-Raleway text-[11px] font-bold uppercase tracking-[0.25em] text-white/55";

const SWContact = () => {
  const { t } = useTranslation();
  const { form, update, status, error, submit, reset } =
    useContactForm("starWars.contact");

  return (
    <section id="sw-contact" className="relative scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid grid-cols-1 w-full max-w-6xl gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p
            data-reveal
            className="font-Raleway text-xs font-bold uppercase tracking-[0.35em] text-[#4fc3f7]"
          >
            {t("starWars.contact.kicker")}
          </p>
          <div className="scroll-drift">
            <h2
              data-reveal
              className="mt-3 font-Raleway text-4xl font-black uppercase tracking-[0.1em] text-[#ffe81f] sm:text-5xl"
            >
              {t("starWars.contact.title")}
            </h2>
          </div>
          <p data-reveal className="mt-4 max-w-md font-Raleway text-white/70">
            {t("starWars.contact.subtitle")}
          </p>

          <div data-reveal className="mt-10">
            <p className="font-Raleway text-xs font-bold uppercase tracking-[0.35em] text-white/45">
              {t("starWars.contact.direct")}
            </p>
            <ul className="mt-4 space-y-3 font-Raleway text-sm">
              {contactChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 break-all text-white transition-colors hover:text-[#ffe81f] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f]"
                  >
                    <span className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                      {channel.label}
                    </span>
                    <span className="border-b border-white/15 pb-0.5 group-hover:border-[#ffe81f]">
                      {channel.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-reveal
          className="relative overflow-hidden rounded-2xl border border-[#4fc3f7]/25 bg-[#06101a]/90 p-6 shadow-[0_0_60px_-20px_rgba(79,195,247,0.4)] sm:p-8"
        >
          <div className="sw-hologram-lines pointer-events-none absolute inset-0 opacity-40" />

          {status === "sent" ? (
            <div className="relative flex flex-col items-start gap-6" role="status">
              <span className="h-3 w-3 animate-pulse rounded-full bg-[#4fc3f7] shadow-[0_0_10px_#4fc3f7]" />
              <p className="font-Raleway text-lg text-white">
                {t("starWars.contact.success")}
              </p>
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-[#ffe81f]/50 px-5 py-2 font-Raleway text-xs font-bold uppercase tracking-[0.2em] text-[#ffe81f] transition-colors hover:bg-[#ffe81f] hover:text-black"
              >
                {t("starWars.contact.sendAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="relative space-y-5">
              <label className={labelClass}>
                {t("starWars.contact.name")}
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder={t("starWars.contact.namePlaceholder")}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                {t("starWars.contact.email")}
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder={t("starWars.contact.emailPlaceholder")}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                {t("starWars.contact.message")}
                <textarea
                  name="comments"
                  rows={5}
                  value={form.comments}
                  onChange={update("comments")}
                  placeholder={t("starWars.contact.messagePlaceholder")}
                  className={`${inputClass} resize-y`}
                />
              </label>

              {error && (
                <p role="alert" className="font-Raleway text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-[#ffe81f] px-8 py-3 font-Raleway text-sm font-black uppercase tracking-[0.25em] text-black transition-[transform,opacity,border-color,background-color,color] hover:shadow-[0_0_28px_rgba(255,232,31,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <span className="matrix-dots">{t("starWars.contact.sending")}</span>
                ) : (
                  t("starWars.contact.send")
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SWContact;
