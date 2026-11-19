"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaChevronDown, FaExternalLinkAlt, FaGithub, FaLayerGroup, FaStar } from "react-icons/fa";
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
  /** The parts of the product I built */
  scope?: string[];
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

// What I built on each project. "Full stack" projects have a C#/.NET API I wrote alongside the site and admin console.
const FULL_STACK = ["Frontend", "Backend API", "Admin console"];
const FRONTEND_ADMIN = ["Frontend", "Admin console"];
const FRONTEND_BACKEND = ["Frontend", "Backend API"];
const FRONTEND = ["Frontend"];

const projects: Project[] = [
  {
    title: "xTechHub",
    description:
      "An online school for tech careers where learners take courses in product management, design and engineering, earn certificates and book one-to-one sessions with mentors. I built the learner site, the admin console for courses, mentors and learners, and the ASP.NET Core API behind both, with Google sign-in, Stripe payments, auto-generated PDF certificates and an xUnit test suite.",
    image: "/projects/xtechhub.jpg",
    technologies: ["Next.js", "TypeScript", "C# / .NET", "EF Core", "SQL Server", "Stripe"],
    demo: "https://xtechhub.ai/",
    category: "EdTech",
    scope: FULL_STACK,
  },
  {
    title: "TMS UK Properties",
    description:
      "A UK-registered property firm specialising in real estate investment, property management and wealth creation for international investors, particularly from Nigeria and the diaspora. I built the public site, the admin console and the .NET API, with Stripe payments, IdentityServer authentication and Microsoft Graph email.",
    image: "/projects/tms.jpg",
    technologies: ["Next.js", "React", "C# / .NET", "SQL Server", "Stripe"],
    demo: "https://www.tmsukproperties.co.uk/",
    category: "Real Estate",
    scope: FULL_STACK,
  },
  {
    title: "SmatX",
    description:
      "A UK transport and logistics company moving people and goods with professional drivers and transparent pricing. Customers request rides, removals, cargo and fresh-produce deliveries online and drivers apply to join the fleet. I built the website, the admin console for requests and drivers, and the .NET API.",
    image: "/projects/smatx.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "C# / .NET"],
    demo: "https://smatx.co.uk/",
    category: "Logistics",
    scope: FULL_STACK,
  },
  {
    title: "Travel Inn Booking",
    description:
      "An IATA-certified online travel agency with one-way, round-trip and multi-city flight search, travel insurance, flexible payments and dedicated customer and affiliate portals. I built the booking site, the admin console with booking analytics and the ASP.NET Core API.",
    image: "/projects/travelinn.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS", "C# / .NET", "OData"],
    demo: "https://travelinnbooking.com/",
    category: "Travel",
    scope: FULL_STACK,
  },
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
    title: "Xown Scorecard",
    description:
      "A lead-generation platform where businesses build, launch and optimise scorecards that turn visitors into qualified leads. I built the scorecard builder and dashboard and the .NET API behind it, with Microsoft sign-in, file storage on AWS S3 and downloadable PDF reports for every respondent.",
    image: "/projects/scorecard.jpg",
    technologies: ["Next.js", "TypeScript", "C# / .NET", "SQL Server", "AWS S3"],
    demo: "https://scoreapp.xown.global/",
    category: "SaaS",
    scope: FULL_STACK,
  },
  {
    title: "Dees Travels",
    description:
      "A travel and tours platform where customers search and book flights and hotels, explore destinations and tour packages, and get instant help from an AI travel agent, with an affiliate programme for partners. I built the customer site, the operations console and the ASP.NET Core booking API, secured with Microsoft Identity and Azure Key Vault.",
    image: "/projects/dees.jpg",
    technologies: ["Next.js", "React", "Prisma", "C# / .NET", "OData", "Azure"],
    demo: "https://deestravels.com/",
    category: "Travel",
    scope: FULL_STACK,
  },
  {
    title: "Moores Energy",
    description:
      "A tech-driven, NMDPRA-licensed LPG plant handling 4,000+ cylinder refills a month. Customers order cooking gas in three steps, pay securely and track doorstep delivery. I built the ordering site, the admin console with sales analytics, and the ASP.NET Core API with Paystack payments and email notifications.",
    image: "/projects/moores.jpg",
    technologies: ["Next.js", "Redux Toolkit", "C# / .NET", "SQL Server", "Paystack"],
    demo: "https://mooresenergy.com/",
    category: "Gas & Energy",
    scope: FULL_STACK,
  },
  {
    title: "The Ark Bearers",
    description:
      "The home of The Ark Bearers of God Ministry, helping people grow in faith through worship, sermons, events, online giving and community connection. I built the website, the admin console the team uses to publish sermons and events, and the .NET API with JWT authentication, verified online donations and Cloudinary media storage.",
    image: "/projects/arkbearers.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "C# / .NET", "EF Core", "SQL Server"],
    demo: "https://thearkbearers.org/",
    category: "Faith & Community",
    scope: FULL_STACK,
  },
  {
    title: "Bablo Homes",
    description:
      "A UK property investment company that lets investors own a part of the UK property market from anywhere in the world, with deal enquiries, project showcases, a VIP investor programme and compliance information. I built the website, the admin console and the .NET API.",
    image: "/projects/bablo.jpg",
    technologies: ["Next.js", "React", "SCSS", "C# / .NET"],
    demo: "https://bablohomes.co.uk/",
    category: "Real Estate",
    scope: FULL_STACK,
  },
  {
    title: "Jenick Travels & Tours",
    description:
      "An IATA-accredited travel agency in Lagos, incorporated in 2011, covering flight bookings, visa processing, vacation planning, study-abroad packages and guided business tours. I built the customer site, the admin console with booking analytics and the ASP.NET Core API.",
    image: "/projects/jenick.jpg",
    technologies: ["Next.js", "React", "GSAP", "C# / .NET", "OData"],
    demo: "https://jenicktravels.com/",
    category: "Travel",
    scope: FULL_STACK,
  },
  {
    title: "Patelo Travels",
    description:
      "A Lagos-based travel management company serving corporate organisations, travel affiliates and individual travellers since 1992, with live flight and hotel search, fare deals, tour packages and visa support. I built the customer site, the admin console and the .NET API.",
    image: "/projects/patelo.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS", "C# / .NET", "Recharts"],
    demo: "https://patelotravels.com/",
    category: "Travel",
    scope: FULL_STACK,
  },
  {
    title: "Xown Global",
    description:
      "The consulting arm of Xown, whose SCaLeXp™ framework helps organisations gain clarity, build structure and scale technology-driven growth, with an online assessment, books, events and workshops. I built the website and the .NET API that powers it.",
    image: "/projects/xownglobal.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "C# / .NET", "EF Core", "SQL Server"],
    demo: "https://xown.global/",
    category: "Consulting",
    scope: FRONTEND_BACKEND,
  },
  {
    title: "Travel Atal",
    description:
      "An online travel platform for booking flights, hotels, curated tours and airport transfers, with 'book now, pay over time' financing that spreads costs into easy instalments. I built the booking site and the admin console for managing bookings, tours, flights and customers.",
    image: "/projects/travelatal.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS", "Recharts"],
    demo: "https://travelatal.com/",
    category: "Travel",
    scope: FRONTEND_ADMIN,
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
    title: "CyberX Summit",
    description:
      "The event site for CyberX Summit, a Lagos cybersecurity conference run in partnership with Kaspersky, with speaker and agenda details, a past-summit video and attendee registration that emails confirmations automatically.",
    image: "/projects/cyberx.jpg",
    technologies: ["Next.js", "React", "SCSS", "Nodemailer"],
    demo: "https://cyberxsummit.africa/",
    category: "Events",
    scope: FRONTEND,
  },
  {
    title: "Platinum Services",
    description:
      "A US concierge and staffing company serving class-A luxury apartments, condominium associations and multi-family residences from Boston to Miami, providing resident concierges, doormen and package porters.",
    image: "/projects/platinum.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS", "Nodemailer"],
    demo: "https://platinum-servicesllc.com/",
    category: "Concierge",
    scope: FRONTEND,
  },
  {
    title: "LightMega Immigration",
    description:
      "A UK-authorised immigration advisory firm regulated at Level 3 by the Immigration Advice Authority (IAA), providing structured, compliant, and result-driven immigration advisory services. The firm focuses on simplifying complex UK immigration processes and delivering tailored solutions for individuals, families, businesses, and organisations.",
    image: "/projects/lightmega.jpg",
    technologies: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    demo: "https://lmimmigration.co.uk/",
    category: "Immigration",
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
];

// The grid shows these first; the rest sit behind "View more projects"
const FEATURED_COUNT = 4;

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
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const visibleProjects = showAll ? projects : projects.slice(0, FEATURED_COUNT);
  const hiddenCount = projects.length - FEATURED_COUNT;

  const toggle = () => {
    // When collapsing, bring the grid back into view so the visitor isn't left far below it
    if (showAll) gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setShowAll(!showAll);
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured"
          accent="Projects"
          description={`${projects.length + 1} live products I've built for brands across travel, real estate, education, logistics, energy, e-commerce, events and professional services. On many I built the whole product: the website, the admin console and the C#/.NET API behind them. Click any project to visit the live site.`}
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
        <div ref={gridRef} id="project-grid" className="grid scroll-mt-24 gap-8 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
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
                {project.scope && (
                  <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-ink-300">
                    <FaLayerGroup className="text-gold-400" aria-hidden />
                    <span className="sr-only">Built: </span>
                    {project.scope.join(" · ")}
                  </p>
                )}
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

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={showAll}
            aria-controls="project-grid"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-7 py-3 font-semibold text-ink-950 shadow-lg shadow-gold-500/25 transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            {showAll ? "Show fewer projects" : `View ${hiddenCount} more projects`}
            <FaChevronDown className={`text-sm transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
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
