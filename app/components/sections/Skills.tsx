"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaCode,
  FaRocket,
  FaLayerGroup,
  FaProjectDiagram,
  FaCubes,
  FaSitemap,
  FaServer,
  FaDatabase,
  FaUserShield,
  FaCreditCard,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiSass,
  SiDocker,
  SiFirebase,
  SiMongodb,
  SiExpo,
  SiVercel,
  SiNetlify,
  SiGithubactions,
  SiDotnet,
  SiNodedotjs,
  SiPhp,
  SiNestjs,
  SiPrisma,
  SiGraphql,
  SiMysql,
  SiSwagger,
  SiCloudinary,
  SiAmazonwebservices,
} from "react-icons/si";
import { TbBrandCSharp, TbDeviceMobileCode, TbSql } from "react-icons/tb";
import SectionHeading from "../SectionHeading";

interface SkillGroup {
  title: string;
  description: string;
  icon: IconType;
  skills: { name: string; icon: IconType }[];
}

const groups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Beautiful, responsive user interfaces",
    icon: FaCode,
    skills: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: FaJs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Sass / SCSS", icon: SiSass },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
    ],
  },
  {
    title: "Backend",
    description: "Secure, scalable APIs and services",
    icon: FaServer,
    skills: [
      { name: "C# / .NET", icon: TbBrandCSharp },
      { name: "ASP.NET Core Web API", icon: SiDotnet },
      { name: "Entity Framework Core", icon: SiDotnet },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "NestJS", icon: SiNestjs },
      { name: "PHP", icon: SiPhp },
      { name: "REST, OData & GraphQL", icon: SiGraphql },
      { name: "JWT, Identity & OAuth", icon: FaUserShield },
    ],
  },
  {
    title: "Mobile",
    description: "Cross-platform mobile applications",
    icon: TbDeviceMobileCode,
    skills: [
      { name: "React Native", icon: FaReact },
      { name: "Expo", icon: SiExpo },
      { name: "Mobile UI Patterns", icon: TbDeviceMobileCode },
      { name: "State Management", icon: FaProjectDiagram },
    ],
  },
  {
    title: "Data & Integrations",
    description: "Databases, payments and cloud services",
    icon: FaDatabase,
    skills: [
      { name: "SQL Server", icon: TbSql },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Prisma", icon: SiPrisma },
      { name: "Stripe, Paystack & Flutterwave", icon: FaCreditCard },
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "AWS (S3, CloudFront, Amplify)", icon: SiAmazonwebservices },
    ],
  },
  {
    title: "Architecture",
    description: "Scalable, maintainable codebases, front to back",
    icon: FaLayerGroup,
    skills: [
      { name: "Component Architecture", icon: FaLayerGroup },
      { name: "State Management", icon: FaProjectDiagram },
      { name: "Reusable UI Patterns", icon: FaCubes },
      { name: "API Design & Swagger", icon: SiSwagger },
      { name: "Admin Consoles & Dashboards", icon: FaSitemap },
    ],
  },
  {
    title: "DevOps & Tools",
    description: "Shipping, deploying and collaborating",
    icon: FaRocket,
    skills: [
      { name: "Git & GitHub", icon: FaGitAlt },
      { name: "Docker", icon: SiDocker },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
      { name: "CI/CD", icon: SiGithubactions },
    ],
  },
];

const coreStack = ["React", "Next.js", "TypeScript", "C# / .NET", "Node.js", "PHP", "React Native", "Tailwind CSS"];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title="Technical"
          accent="Expertise"
          description="The technologies I use day to day to design, build and ship production apps, from the interface to the API and database."
        />

        {/* Core stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
            Core stack
          </span>
          {coreStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-4 py-1.5 text-sm font-semibold text-ink-950"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-ink-700/70 bg-ink-800/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-ink-800/50"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-xl text-ink-950 shadow-lg shadow-gold-500/20">
                  <group.icon />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white">{group.title}</h3>
                  <p className="text-xs text-ink-400">{group.description}</p>
                </div>
              </div>

              <ul className="space-y-1">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-ink-200 transition-colors hover:bg-ink-700/40 hover:text-white"
                  >
                    <skill.icon className="flex-shrink-0 text-base text-gold-400" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
