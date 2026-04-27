export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen pt-28">
      <section className="flex min-h-[80vh] flex-col items-center justify-center py-20">
        <div className="shell text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-green-300/70">
            Features
          </p>
          <h1
            className="mt-4 font-display text-6xl font-semibold tracking-tight text-white sm:text-7xl"
            style={{
              textShadow:
                "0 0 40px rgba(74,222,128,0.22), 0 0 80px rgba(74,222,128,0.10)",
            }}
          >
            Built different.<br />On purpose.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Full feature breakdown incoming. The blueprint is being assembled.
          </p>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {["Hotkey Launcher", "6 Smart Modes", "Screen Awareness"].map((f) => (
              <div
                key={f}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-xl text-white/75 text-sm font-medium transition-all duration-300 hover:border-green-400/20 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(74,222,128,0.10)]"
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
