"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaCode, FaLayerGroup, FaMobile, FaServer, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";
import SectionHeading from "../SectionHeading";

const services = [
  {
    icon: FaCode,
    title: "Frontend Development",
    description:
      "Modern, responsive and accessible user interfaces built with cutting-edge frontend technologies for high-performance web applications.",
    features: [
      "Responsive UI Design",
      "React & Next.js",
      "State Management",
      "Performance Optimization",
    ],
  },
  {
    icon: FaServer,
    title: "Backend Development",
    description:
      "Secure, scalable APIs and services in C#/.NET, Node.js and PHP, backed by well-designed SQL and NoSQL databases and ready for real traffic.",
    features: [
      "ASP.NET Core Web APIs",
      "Node.js & PHP Services",
      "Auth, Roles & Security",
      "Payments & Third-Party APIs",
    ],
  },
  {
    icon: FaLayerGroup,
    title: "Full-Stack Development",
    description:
      "End-to-end products from database to interface: I design the data model, build the API, ship the frontend and deploy it all, so one engineer owns the whole picture.",
    features: [
      "Next.js + .NET / Node.js",
      "Database Design",
      "Cloud Deployment & CI/CD",
      "Ongoing Support",
    ],
  },
  {
    icon: FaMobile,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications built with React Native and Expo. Native performance with shared codebase efficiency.",
    features: [
      "iOS & Android",
      "Cross-Platform",
      "Native Performance",
      "App Store Deployment",
    ],
  },
  {
    icon: FaShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Complete e-commerce platforms with payment integration, inventory management and analytics. Scalable and secure online stores.",
    features: [
      "Payment Integration",
      "Inventory Management",
      "Analytics Dashboard",
      "SEO Optimization",
    ],
  },
  {
    icon: FaTachometerAlt,
    title: "Admin Consoles & Dashboards",
    description:
      "Back-office tools your team actually enjoys using, to manage bookings, orders, content and customers, with role-based access and live analytics.",
    features: [
      "Role-Based Access",
      "Analytics & Reporting",
      "Content Management",
      "Booking & Order Management",
    ],
  },
];

interface ServicesProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Services({ scrollToSection }: ServicesProps) {
  return (
    <section id="services" className="relative overflow-hidden bg-ink-900 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What I offer"
          title="My"
          accent="Services"
          description="Digital solutions tailored to turn your ideas into powerful, scalable applications."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-800/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40"
            >
              <span className="absolute right-6 top-6 font-display text-5xl font-bold text-ink-700/60 transition-colors group-hover:text-gold-500/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-2xl text-ink-950 shadow-lg shadow-gold-500/20">
                <service.icon />
              </span>

              <h3 className="mb-3 text-2xl font-bold text-white">
                {service.title}
              </h3>
              <p className="mb-6 leading-relaxed text-ink-300">
                {service.description}
              </p>

              <ul className="mt-auto space-y-2.5 border-t border-ink-700/70 pt-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-ink-200"
                  >
                    <FaCheck className="text-[10px] text-gold-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/10 via-ink-800/40 to-navy/40 p-8 text-center md:flex-row md:text-left"
        >
          <div>
            <h3 className="text-2xl font-bold text-white">
              Have a project in mind?
            </h3>
            <p className="mt-1 text-ink-300">
              Tell me what you&apos;re building and let&apos;s figure out how
              to bring it to life.
            </p>
          </div>
          <button
            onClick={() => scrollToSection("contact")}
            className="group inline-flex flex-shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-7 py-3 font-semibold text-ink-950 transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Start a project
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
