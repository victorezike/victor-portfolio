"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaExternalLinkAlt, FaGithub, FaStar } from "react-icons/fa";
import { GITHUB_URL } from "../site";
import SectionHeading from "../SectionHeading";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo: string;
  category: string;
  highlights?: string[];
}

const spotlight: Project = {
  title: "247Travels",
  description:
    "An end-to-end online travel booking platform for flights, hotels and holiday packages with real-time availability checks. I built it with the team at Xown Solutions and took it from first commit to a platform that handles seasonal booking spikes without breaking a sweat.",
  image: "/projects/247travels.jpg",
  technologies: ["Next.js", "React", "Tailwind CSS", "AWS", "Paystack", "Flutterwave"],
  demo: "https://www.247travels.com/",
  category: "Travel",
  highlights: [
    "10,000+ concurrent users handled during peak booking season",
    "₦50M+ processed in its first year via Paystack and Flutterwave",
    "Sub-250ms TTI with Next.js ISR, API caching and AWS CloudFront",
  ],
};

const projects: Project[] = [
  {
    title: "Beviham",
    description:
      "The official website and online shop for Beviham, a trusted source for original devices, business tech and energy solutions with nationwide delivery. Grew online visibility by 60% in its first three months with under-2-second page loads.",
    image: "/projects/beviham.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://beviham.com/",
    category: "E-Commerce",
  },
  {
    title: "Green Atlas Holdings",
    description:
      "The corporate home of Green Atlas Holdings, a diversified conglomerate spanning real estate, construction, hospitality, agriculture, sports and transportation, with a hub for each of its subsidiaries.",
    image: "/projects/greenatlas.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://greenatlasholdings.com/",
    category: "Corporate",
  },
  {
    title: "Dees Travels",
    description:
      "A travel and tours platform where customers search and book flights and hotels, explore popular destinations and tour packages, and get instant help from an AI travel agent, with an affiliate programme for partners.",
    image: "/projects/dees.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://deestravels.com/",
    category: "Travel",
  },
  {
    title: "Darabara",
    description:
      "A UK childcare platform that matches families with thoroughly vetted childcare providers through personalised recruitment, with expert training, careers and account management built in.",
    image: "/projects/darabara.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://darabara.co.uk/",
    category: "Childcare",
  },
  {
    title: "Alviz Studios",
    description:
      "A portfolio site for a UK architectural visualisation studio, built around full-screen showcases of photorealistic 3D renders that let the work speak for itself.",
    image: "/projects/alviz.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://alvizstudios.co.uk/",
    category: "Creative Studio",
  },
  {
    title: "Green Atlas Farms & Agro",
    description:
      "The agriculture arm of Green Atlas, championing eco-friendly farming, fresh farm produce and farmer empowerment, with services, a blog and consultation bookings.",
    image: "/projects/greenatlasfarms.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://greenatlasfarmsandagro.com/",
    category: "Agriculture",
  },
  {
    title: "xTechHub",
    description:
      "An innovative edutech platform that helps learners and early-career professionals acquire future-ready digital and technology skills. xTechHub bridges the gap between academic learning and real-world employment by blending structured technical training with community support and practical career development.",
    image: "/projects/xtechhub.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://xtechhub.ai/",
    category: "EdTech",
  },
  {
    title: "Jenick Travels & Tours",
    description:
      "An IATA-accredited travel agency in Lagos, incorporated in 2011. The platform covers flight bookings, visa processing, vacation planning, study-abroad packages and guided business tours, such as China discovery trips for entrepreneurs.",
    image: "/projects/jenick.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://jenicktravels.com/",
    category: "Travel",
  },
  {
    title: "LightMega Immigration",
    description:
      "A UK-authorised immigration advisory firm regulated at Level 3 by the Immigration Advice Authority (IAA), providing structured, compliant, and result-driven immigration advisory services. The firm focuses on simplifying complex UK immigration processes and delivering tailored solutions for individuals, families, businesses, and organisations.",
    image: "/lightmega_portfolio_Img.png",
    technologies: ["Next.js", "Tailwind", "CSS", "Shad CN"],
    demo: "https://lmimmigration.co.uk/",
    category: "Immigration",
  },
  {
    title: "TMS UK Properties",
    description:
      "A prominent UK-registered property firm specialising in real estate investment, property management and wealth creation. Led by CEO Kayode Adeagbo, TMS helps international investors, particularly from Nigeria and the diaspora, tap into the UK property market.",
    image: "/projects/tms.jpg",
    technologies: ["Next.js", "React"],
    demo: "https://www.tmsukproperties.co.uk/",
    category: "Real Estate",
  },
  {
    title: "Travel Atal",
    description:
      "An online travel platform for booking flights, hotels, curated tours and airport transfers at competitive fares. Its 'book now, pay over time' financing spreads the cost of flights, hotels, visas and tours into easy instalments.",
    image: "/projects/travelatal.jpg",
    technologies: ["Next.js", "React"],
    demo: "https://travelatal.com/",
    category: "Travel",
  },
  {
    title: "Platinum Services",
    description:
      "A US concierge and staffing company serving class-A luxury apartments, condominium associations and multi-family residences from Boston to Miami. It provides resident concierges, doormen and package porters, plus a mobile concierge app for residents.",
    image: "/projects/platinum.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://platinum-servicesllc.com/",
    category: "Concierge",
  },
  {
    title: "Asegun",
    description:
      "A UK accounting firm with 25+ years of experience, serving 150+ individuals, SMEs and law firms. Services include outsourced legal cashiering for solicitors, business accounting, self-assessment tax returns and Xero-powered cloud accounting with real-time financial insight.",
    image: "/projects/asegun.jpg",
    technologies: ["React", "Tailwind", "SCSS"],
    demo: "https://asegun.co.uk/",
    category: "Accounting & Finance",
  },
  {
    title: "Patelo Travels",
    description:
      "A Lagos-based travel management company that has served corporate organisations, travel affiliates and individual travellers since 1992. The platform offers live flight and hotel search, curated fare deals, tour packages, visa support and an affiliate programme.",
    image: "/projects/patelo.jpg",
    technologies: ["Next.js", "React"],
    demo: "https://patelotravels.com/",
    category: "Travel",
  },
  {
    title: "Moores Energy",
    description:
      "A tech-driven, NMDPRA-licensed LPG filling plant handling 4,000+ cylinder refills a month. Customers order cooking gas in three steps on the website or app, pay securely and track doorstep delivery within 45 minutes to 3 hours, with loyalty rewards and bulk supply for businesses.",
    image: "/projects/moores.jpg",
    technologies: ["React", "Tailwind", "SCSS"],
    demo: "https://mooresenergy.com/",
    category: "Gas & Energy",
  },
];

const domainOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

function BrowserFrame({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700/80 bg-ink-900 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 border-b border-ink-700/80 bg-ink-800/90 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-500/70" />
        </div>
        <div className="flex-1 truncate rounded-md bg-ink-950/70 px-3 py-1 text-center font-mono text-xs text-ink-400">
          {domainOf(project.demo)}
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} website`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-5 flex justify-center opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-sm font-semibold text-ink-950 shadow-lg">
            Visit site <FaExternalLinkAlt className="text-xs" />
          </span>
        </div>
      </div>
    </div>
  );
}

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs text-gold-300"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured"
          accent="Projects"
          description={`${projects.length + 1} live products I've built for brands across travel, e-commerce, real estate, agriculture, education, energy and professional services. Click any project to visit the live site.`}
        />

        {/* Spotlight project */}
        <motion.a
          href={spotlight.demo}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="group mb-16 grid items-center gap-10 rounded-3xl border border-gold-500/25 bg-gradient-to-br from-ink-800/80 via-ink-900/80 to-navy/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/60 md:p-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <BrowserFrame project={spotlight} priority />
          </div>

          <div className="lg:col-span-5">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">
                <FaStar /> Spotlight
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                {spotlight.category}
              </span>
            </div>
            <h3 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {spotlight.title}
            </h3>
            <p className="mb-6 leading-relaxed text-ink-300">{spotlight.description}</p>
            <ul className="mb-6 space-y-3">
              {spotlight.highlights?.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-200">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                    <FaCheck className="text-[10px]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mb-8">
              <TechChips items={spotlight.technologies} />
            </div>
            <span className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-7 py-3 font-semibold text-ink-950 shadow-lg shadow-gold-500/25 transition-transform duration-300 group-hover:scale-105">
              Visit live site
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.a>

        {/* Project grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.12 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -8 }}
              className="group flex flex-col rounded-2xl border border-ink-700/70 bg-ink-800/40 p-4 md:odd:last:col-span-2 md:odd:last:w-[calc(50%-1rem)] md:odd:last:justify-self-center backdrop-blur-sm transition-colors duration-500 hover:border-gold-500/50 hover:bg-ink-800/70 hover:shadow-2xl hover:shadow-gold-500/10 sm:p-5"
            >
              <BrowserFrame project={project} />

              <div className="flex flex-1 flex-col px-1 pt-6 pb-1">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-gold-500/80">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                    {project.category}
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gold-300">
                  {project.title}
                </h3>
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-ink-300">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                  <TechChips items={project.technologies} />
                  <span className="flex items-center gap-2 text-sm font-medium text-gold-400">
                    View live
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-ink-400">Want to see more of my code?</p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-ink-600 px-6 py-3 font-medium text-ink-100 transition-colors hover:border-gold-500/60 hover:text-gold-300"
          >
            <FaGithub className="text-lg" /> Browse my GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
