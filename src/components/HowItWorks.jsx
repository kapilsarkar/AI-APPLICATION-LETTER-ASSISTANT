const steps = [
  {
    number: '01',
    title: 'Choose a document',
    description: 'Select the type of application, letter, email, or formal document you need.',
  },
  {
    number: '02',
    title: 'Answer guided questions',
    description: 'Share the important details through simple, easy-to-follow questions.',
  },
  {
    number: '03',
    title: 'Get your polished document',
    description: 'Review your completed draft and make it ready to use.',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="border-y border-stone-200 bg-stone-50 px-5 py-16 sm:px-7 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-700">How it works</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            A clear path from idea to document.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            AI WriteAssist keeps the process simple, so you can focus on what you want to say.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(({ number, title, description }, index) => (
            <li key={title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-700 text-sm font-extrabold text-white shadow-sm">
                {number}
              </span>
              {index < steps.length - 1 && (
                <span className="absolute -right-5 top-[2.15rem] z-10 hidden h-px w-10 bg-emerald-200 md:block" aria-hidden="true" />
              )}
              <h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks