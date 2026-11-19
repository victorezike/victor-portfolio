"use client";

import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGraduationCap,
  FaRocket,
  FaUsers,
  FaChalkboardTeacher,
  FaDumbbell,
  FaCamera,
} from "react-icons/fa";
import SectionHeading from "../SectionHeading";

const facts = [
  { icon: FaMapMarkerAlt, title: "Based in", value: "Lagos, Nigeria" },
  { icon: FaCalendarAlt, title: "Experience", value: "3+ years" },
  { icon: FaGraduationCap, title: "Education", value: "B.Sc Computer Science" },
  { icon: FaRocket, title: "Focus", value: "Full-stack & mobile" },
];

const interests = [
  {
    icon: FaUsers,
    title: "Community",
    desc: "Organised tech conferences, hackathons and workshops back at Landmark University",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Mentoring",
    desc: "Helping other engineers level up in TypeScript, Next.js and clean code",
  },
  {
    icon: FaDumbbell,
    title: "Gym & football",
    desc: "Bodybuilding keeps me disciplined; football keeps me humble",
  },
  {
    icon: FaCamera,
    title: "Off the clock",
    desc: "Photography, travelling, DIY projects and the occasional console gaming marathon",
  },
];

// Syntax-highlighted "profile" rendered as code
const codeLines: [string, string][][] = [
  [["k", "const "], ["v", "victor"], ["p", " = {"]],
  [["p", "  role: "], ["s", '"Full-Stack Software Engineer"'], ["p", ","]],
  [["p", "  company: "], ["s", '"Xown Solutions"'], ["p", ","]],
  [["p", "  location: "], ["s", '"Lagos, Nigeria"'], ["p", ","]],
  [["p", "  school: "], ["s", '"Landmark University, B.Sc CS"'], ["p", ","]],
  [["p", "  stack: ["]],
  [["s", '    "React"'], ["p", ", "], ["s", '"Next.js"'], ["p", ", "], ["s", '"TypeScript"'], ["p", ","]],
  [["s", '    "C# / .NET"'], ["p", ", "], ["s", '"Node.js"'], ["p", ", "], ["s", '"PHP"'], ["p", ","]],
  [["s", '    "React Native"'], ["p", ", "], ["s", '"SQL Server"']],
  [["p", "  ],"]],
  [["p", "  cares: "], ["s", '"fast, reliable, accessible software"'], ["p", ","]],
  [["p", "};"]],
];

const tokenClass: Record<string, string> = {
  k: "text-gold-400",
  v: "text-sky-300",
  s: "text-amber-200",
  p: "text-ink-300",
};

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-900 py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Who I am" title="About" accent="Me" />

        {/* Desktop: code card on the left, bio then quick facts and mission on the right.
            Phones: bio, code card, then facts and mission. */}
        <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="min-w-0 lg:col-start-2 lg:row-start-1"
          >
            <h3 className="mb-5 text-3xl font-bold sm:text-4xl">
              <span className="text-gold-300">Full-Stack</span> Software
              Engineer
            </h3>
            <p className="mb-5 text-lg leading-relaxed text-ink-200">
              I&apos;m Victor Ezike, a Software Engineer at Xown Solutions in
              Lagos and a Computer Science graduate of Landmark University. I
              build products end to end, with React, Next.js and React Native
              on the front and C#/.NET, Node.js and PHP on the back.
            </p>
            <p className="mb-5 leading-relaxed text-ink-400">
              I started as a frontend intern, worked remotely with Lendastack,
              and today own products from the database up, including the
              247Travels booking platform: 10,000+ concurrent users and over
              ₦50M in payments.
            </p>
            <p className="leading-relaxed text-ink-400">
              I care about fast pages, interfaces that work on every screen,
              and code the next engineer will be glad to inherit.
            </p>
          </motion.div>

          {/* Code card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="theme-dark relative mx-auto w-full min-w-0 max-w-lg self-center lg:col-start-1 lg:row-span-2 lg:row-start-1"
          >
              <div className="absolute -inset-3 rotate-2 rounded-3xl bg-gradient-to-br from-gold-400/30 to-gold-700/10 blur-sm" />
              <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-950 shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 border-b border-ink-800 bg-ink-900 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-ink-700" />
                  <span className="h-3 w-3 rounded-full bg-ink-700" />
                  <span className="h-3 w-3 rounded-full bg-gold-500/70" />
                  <span className="ml-3 font-mono text-xs text-ink-400">
                    about-me.ts
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm">
                  <code>
                    {codeLines.map((line, i) => (
                      <div key={i} className="flex">
                        <span className="mr-5 w-5 select-none text-right text-ink-600">
                          {i + 1}
                        </span>
                        <span>
                          {line.map(([type, text], j) => (
                            <span key={j} className={tokenClass[type]}>
                              {text}
                            </span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
          </motion.div>

          {/* Quick facts + mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="min-w-0 space-y-8 lg:col-start-2 lg:row-start-2"
          >
            <dl className="grid grid-cols-2 gap-4">
              {facts.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-ink-700/70 bg-ink-800/40 p-4 transition-colors hover:border-gold-500/40"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-300">
                    <item.icon />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs uppercase tracking-wider text-ink-400">
                      {item.title}
                    </dt>
                    <dd className="mt-0.5 font-medium text-white">
                      {item.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="rounded-xl border-l-2 border-gold-400 bg-gold-500/5 p-6">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold-300">
                My mission
              </h4>
              <p className="leading-relaxed text-ink-300">
                To build software that just works: fast, reliable and accessible
                products that solve real problems for real people, help
                businesses grow, and leave every codebase (and every engineer
                I work with) better than I found them.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Beyond coding */}
        <div>
          <h3 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            Beyond <span className="text-gold-300">coding</span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl border border-ink-700/70 bg-ink-800/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40"
              >
                <interest.icon className="mb-4 text-2xl text-gold-300" />
                <h4 className="mb-2 font-semibold text-white">
                  {interest.title}
                </h4>
                <p className="text-sm leading-relaxed text-ink-400">
                  {interest.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
