"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import SectionHeading from "../SectionHeading";

const experiences = [
  {
    title: "Software Engineer",
    company: "Xown Solutions",
    period: "Mar 2025 – Present",
    location: "Lagos",
    type: "Full-time",
    current: true,
    description:
      "Building full-stack products for clients across travel, real estate, education, logistics and energy: the customer-facing websites, the admin consoles teams run their business from, and the C#/.NET APIs behind them. I've shipped 20+ live products, from 247Travels and xTechHub to Moores Energy and TMS UK Properties.",
    achievements: [
      "Built ASP.NET Core Web APIs with Entity Framework Core and SQL Server, secured with JWT, ASP.NET Identity, IdentityServer and Microsoft Entra ID",
      "Integrated Stripe, Paystack and Flutterwave payments, Cloudinary and AWS S3 storage, transactional email and PDF generation",
      "Built admin consoles with role-based access and analytics dashboards so clients manage bookings, content, orders and customers themselves",
      "Migrated the company site from CRA to Next.js (SSR + ISR), lifting SEO traffic by 50% and Lighthouse scores from 65 to 92+",
      "Built 3 reusable Tailwind component libraries, cutting UI development time by 30%",
      "Mentored 4 engineers in advanced TypeScript and Next.js data-fetching strategies",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "C# / .NET",
      "ASP.NET Core",
      "EF Core",
      "SQL Server",
      "Node.js",
      "PHP",
      "Tailwind CSS",
      "AWS",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Lendastack",
    period: "Mar 2023 – Oct 2023",
    location: "Remote",
    type: "Internship",
    current: false,
    description:
      "Worked remotely with the product team on a new product, from the first prototype onwards, across both the frontend and the backend.",
    achievements: [
      "Collaborated with a team of 5 to design and build a functional prototype that validated the market need and attracted investor interest",
      "Cut database queries by 40% by adding efficient caching and refactoring slow code paths",
      "Integrated third-party services through RESTful APIs and webhooks, expanding the product's functionality",
    ],
    technologies: ["JavaScript", "Node.js", "REST APIs", "Webhooks", "Caching"],
  },
  {
    title: "Frontend Developer Intern",
    company: "Arkounting Business Concept",
    period: "Nov 2018 – Jan 2021",
    location: "Yaba, Lagos",
    type: "Internship",
    current: false,
    description:
      "Where I wrote my first production code, working directly on user-facing products while still a student.",
    achievements: [
      "Launched a suite of new features driven by user feedback, increasing engagement by 16%",
      "Led a team fixing high-priority bugs, improving stability and reliability by 46% through root-cause analysis and rigorous testing",
      "Guided other interns through their project milestones with advice and technical support",
      "Designed web and mobile apps in Figma and built them with HTML, CSS and JavaScript",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Figma"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-ink-900 py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Career"
          title="Professional"
          accent="Journey"
          description="A timeline of growth, learning and impactful contributions across the teams I've worked with."
        />

        <ol className="relative border-l border-ink-700 md:ml-48">
          {experiences.map((exp, index) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative mb-12 pl-8 last:mb-0 md:pl-10"
            >
              {/* Timeline dot */}
              <span
                className={`absolute -left-[9px] top-2 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-ink-900 ${
                  exp.current ? "bg-gold-400" : "bg-ink-600"
                }`}
              >
                {exp.current && (
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-gold-400/60" />
                )}
              </span>

              {/* Period (left rail on desktop) */}
              <div className="mb-3 md:absolute md:-left-48 md:top-0.5 md:mb-0 md:w-40 md:text-right">
                <p className="text-sm font-semibold text-gold-300">
                  {exp.period}
                </p>
                <p className="mt-1 hidden items-center justify-end gap-1.5 text-xs text-ink-400 md:flex">
                  <FaMapMarkerAlt /> {exp.location}
                </p>
              </div>

              <div className="rounded-2xl border border-ink-700/70 bg-ink-800/40 p-6 transition-colors duration-300 hover:border-gold-500/40 md:p-8">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                      {exp.title}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-300">
                      <span className="flex items-center gap-2 font-medium text-gold-300">
                        <FaBriefcase className="text-xs" /> {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-ink-400 md:hidden">
                        <FaMapMarkerAlt className="text-xs" /> {exp.location}
                      </span>
                    </p>
                  </div>
                  <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-300">
                    {exp.type}
                  </span>
                </div>

                <p className="mb-5 leading-relaxed text-ink-300">
                  {exp.description}
                </p>

                <ul className="mb-6 space-y-2.5">
                  {exp.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-start gap-3 text-sm text-ink-200"
                    >
                      <FaCheck className="mt-1 flex-shrink-0 text-[10px] text-gold-400" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-ink-950/60 px-2.5 py-1 font-mono text-xs text-ink-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
