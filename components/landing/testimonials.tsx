import { Marquee } from '@/components/landing/marquee';

const testimonials = [
  {
    quote:
      'I stopped opening a dozen tabs just to clean up a sentence. Zooey feels like a keyboard reflex.',
    name: 'Maya',
    role: 'Product Designer'
  },
  {
    quote:
      'The best part is that it never drags me into a chat window. I trigger it, get the answer, and keep shipping.',
    name: 'Daniel',
    role: 'Indie Developer'
  },
  {
    quote:
      'It behaves like a tiny utility, not a destination app. That is exactly why I use it more.',
    name: 'Jules',
    role: 'Founder'
  },
  {
    quote:
      'Mode-based actions make it predictable. Fix means fix. Write means write. No fluff.',
    name: 'Aria',
    role: 'Operations Lead'
  },
  {
    quote:
      'Output showing up beside the cursor sounds small, but it changes the whole rhythm of work.',
    name: 'Noah',
    role: 'Engineer'
  }
];

function TestimonialCard({
  quote,
  name,
  role
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <article className="panel-surface w-[22rem] shrink-0 rounded-[28px] p-5 sm:w-[25rem]">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="h-2 w-2 rounded-full bg-green-300" />
        ))}
      </div>
      <p className="text-base leading-7 text-white/78">“{quote}”</p>
      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="font-display text-xl font-semibold tracking-tight text-white">{name}</p>
        <p className="text-sm uppercase tracking-[0.28em] text-white/42">{role}</p>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-28">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-green-300/70">
            What it feels like
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            People notice the missing friction first
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/66">
            Zooey wins because it saves the tiny breaks in momentum that add up all day.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          <Marquee className="[--duration:34s]">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:40s]">
            {testimonials.slice().reverse().map((testimonial) => (
              <TestimonialCard key={`${testimonial.name}-reverse`} {...testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
