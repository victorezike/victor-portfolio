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
      "Working with a team of 8 developers in building enterprise-grade web applications. Architected and implemented microservices infrastructure that improved system performance by ≥35%. Spearheaded the adoption of modern development practices including CI/CD, automated testing, and code reviews.",
    achievements: [
      "Improved application performance and reduced page load time through frontend optimization techniques",
      "Built and maintained reusable UI components to improve development speed and consistency",
      "Collaborated with designers and developers to deliver responsive, user-friendly interfaces",
      "Refactored existing codebases to improve readability, maintainability, and scalability",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "SCSS",
    ],
  },
  {
    title: "Frontend Development Intern",
    company: "SQI College of ICT",
    period: "Jul 2023 – Sep 2023",
    location: "Ibadan, Nigeria",
    type: "Internship",
    current: false,
    description:
      "Completed an intensive frontend development internship focused on building responsive and interactive web interfaces. Gained hands-on experience translating designs into functional user interfaces and working with modern frontend tools and workflows.",
    achievements: [
      "Built multiple responsive web pages using HTML, CSS, and JavaScript",
      "Developed interactive UI components with React",
      "Improved understanding of frontend best practices and clean code principles",
      "Collaborated on mini-projects simulating real-world development workflows",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Frontend Development Trainee",
    company: "Valuemax Communication",
    period: "Aug 2022 – Oct 2022",
    location: "Nigeria",
    type: "Training",
    current: false,
    description:
      "Underwent foundational training in frontend development, focusing on core web technologies and basic user interface creation. Built a solid understanding of how web pages are structured, styled, and made interactive.",
    achievements: [
      "Learned the fundamentals of HTML, CSS, and JavaScript",
      "Built simple static and interactive web pages",
      "Gained early exposure to responsive design principles",
      "Developed strong interest in frontend and UI development",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
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
