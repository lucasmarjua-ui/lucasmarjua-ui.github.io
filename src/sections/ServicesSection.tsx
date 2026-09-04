import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Mobile App Development',
    description:
      'Cross-platform mobile apps built with Flutter, connected to real-time backends like Firebase — from first prototype to a working, deployable product.',
  },
  {
    number: '02',
    name: 'Web Development',
    description:
      'Clean, fast, responsive websites and web apps built with modern JavaScript — from marketing sites to fully interactive, data-driven experiences.',
  },
  {
    number: '03',
    name: 'Game Development',
    description:
      'Browser and Unity-based games with custom mechanics, data-driven content systems, and polished, tested UI.',
  },
  {
    number: '04',
    name: 'UI/UX & Web Design',
    description: 'Thoughtful interfaces that make an app or site feel considered and professional, not just functional.',
  },
  {
    number: '05',
    name: 'Client Websites',
    description: 'End-to-end web builds for real businesses, from initial design through to a live, deployed site.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className={`flex items-start gap-6 border-t py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12 ${
                i === SERVICES.length - 1 ? 'border-b' : ''
              }`}
              style={{ borderColor: 'rgba(12,12,12,0.15)' }}
            >
              <span
                className="shrink-0 font-black text-[#0C0C0C]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-3 pt-2 sm:pt-4 md:pt-6">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
