import { VeritasStudio } from "@/components/veritas-studio";
import { pitchSignals, processSteps, trustStats } from "@/lib/demo-content";

export default function Page() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbfcfb_0%,#f7f3ea_42%,#f8faf8_100%)]">
      <div className="absolute inset-0 -z-10 bg-veritas-grid bg-[length:24px_24px] opacity-[0.35]" />
      <div className="absolute inset-0 -z-10 bg-veritas-glow opacity-100" />

      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-8 lg:px-10 lg:py-10">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/80 px-6 py-5 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-brand-700">Veritas</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-900 md:text-5xl">
              The trust layer for digital content.
            </h1>
          </div>
          <div className="max-w-xl text-sm leading-6 text-ink-600 md:text-right">
            Privacy-first AI detection for images, text, and video. All analysis stays client-side except for
            tiny, key-protected API calls through a thin proxy that never stores or logs user content.
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-soft backdrop-blur md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Round 1 Demo</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] text-ink-900 md:text-7xl">
              Detect AI-generated content before it spreads.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-700 md:text-lg">
              Veritas is built for the competition demo today and the browser extension tomorrow. It analyzes
              user-provided content in real time, explains why something looks synthetic, and keeps the entire
              workflow privacy-preserving.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {trustStats.map((stat) => (
                <article key={stat.label} className="rounded-3xl border border-ink-200 bg-ink-50 px-4 py-5">
                  <p className="text-3xl font-semibold text-ink-900">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-ink-600">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-brand-200 bg-ink-900 p-6 text-white shadow-lift md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-brand-200">Why this wins</p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-ink-100/90">
              {pitchSignals.map((signal) => (
                <li key={signal.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{signal.title}</p>
                  <p className="mt-1 text-ink-100/85">{signal.description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <VeritasStudio />

        <section className="grid gap-4 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-sm font-semibold text-brand-800">
                0{index + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-600">{step.description}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
