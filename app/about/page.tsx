export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-28">
      <section className="flex min-h-[80vh] flex-col items-center justify-center py-20">
        <div className="shell text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-green-300/70">
            About
          </p>
          <h1
            className="mt-4 font-display text-6xl font-semibold tracking-tight text-white sm:text-7xl"
            style={{
              textShadow:
                "0 0 40px rgba(74,222,128,0.22), 0 0 80px rgba(74,222,128,0.10)",
            }}
          >
            One person.<br />One obsession.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/55">
            The founder story and product origin are coming. This page will tell the full picture.
          </p>

          <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-green-300/60 mb-3">Origin</p>
            <p className="text-white/55 text-sm leading-7">
              Zooey was built out of frustration with context switching. Every tool required leaving what you were doing. This one does not.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
