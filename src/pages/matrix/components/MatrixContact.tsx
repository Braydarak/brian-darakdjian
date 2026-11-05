import { useTranslation } from "react-i18next";
import { contactChannels } from "../../../data/contactChannels";
import { useContactForm } from "../../../hooks/useContactForm";

const inputClass =
  "mt-1 w-full border border-[#00ff41]/40 bg-black/70 px-3 py-2 text-[#d1ffd9] placeholder:text-[#00ff41]/30 caret-[#00ff41] transition-colors focus:border-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41]";

const MatrixContact = () => {
  const { t } = useTranslation();
  const { form, update, status, error, submit, reset } =
    useContactForm("matrix.contact");

  return (
    <section
      id="matrix-contact"
      className="relative scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid grid-cols-1 w-full max-w-6xl gap-10 sm:gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p data-reveal className="text-sm text-[#00ff41]/70 sm:text-base">
            <span className="text-[#00ff41]">$</span> {t("matrix.contact.prompt")}
          </p>
          <div className="scroll-drift">
            <h2
              data-reveal
              className="mt-3 text-3xl font-bold uppercase tracking-wider text-[#00ff41] [text-shadow:0_0_14px_rgba(0,255,65,0.5)] sm:text-4xl"
            >
              {t("matrix.contact.title")}
            </h2>
          </div>
          <p data-reveal className="mt-3 max-w-md text-[#00ff41]/75">
            {t("matrix.contact.subtitle")}
          </p>

          <div data-reveal className="mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00ff41]/50">
              {t("matrix.contact.direct")}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {contactChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex gap-2 break-all text-[#d1ffd9] transition-colors hover:text-[#00ff41] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff41]"
                  >
                    <span className="text-[#00ff41]/50">{channel.label}:</span>
                    <span className="underline decoration-[#00ff41]/30 underline-offset-4 group-hover:decoration-[#00ff41]">
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
          className="border border-[#00ff41]/30 bg-black/85"
        >
          <div className="flex items-center gap-2 border-b border-[#00ff41]/20 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#00ff41]/80" />
            <span className="ml-2 text-xs text-[#00ff41]/50">
              {t("matrix.contact.prompt")}
            </span>
          </div>

          {status === "sent" ? (
            <div className="flex flex-col items-start gap-6 p-6" role="status">
              <p className="text-[#00ff41]">
                <span className="text-[#00ff41]/60">&gt;</span>{" "}
                {t("matrix.contact.success")}
              </p>
              <button
                type="button"
                onClick={reset}
                className="border border-[#00ff41]/50 px-4 py-2 text-sm text-[#00ff41] transition-colors hover:bg-[#00ff41] hover:text-black"
              >
                {t("matrix.contact.sendAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5 p-6">
              <label className="block text-sm text-[#00ff41]/70">
                &gt; {t("matrix.contact.name")}
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder={t("matrix.contact.namePlaceholder")}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm text-[#00ff41]/70">
                &gt; {t("matrix.contact.email")}
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder={t("matrix.contact.emailPlaceholder")}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm text-[#00ff41]/70">
                &gt; {t("matrix.contact.message")}
                <textarea
                  name="comments"
                  rows={5}
                  value={form.comments}
                  onChange={update("comments")}
                  placeholder={t("matrix.contact.messagePlaceholder")}
                  className={`${inputClass} resize-y`}
                />
              </label>

              {error && (
                <p role="alert" className="text-sm text-red-400">
                  ! {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full border border-[#00ff41] bg-[#00ff41] px-6 py-3 font-bold uppercase tracking-wider text-black transition-[transform,opacity,border-color,background-color,color] hover:shadow-[0_0_24px_rgba(0,255,65,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d1ffd9] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <span className="matrix-dots">{t("matrix.contact.sending")}</span>
                ) : (
                  t("matrix.contact.send")
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default MatrixContact;
