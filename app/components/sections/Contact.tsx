"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import SectionHeading from "../SectionHeading";
import { EMAIL, socials } from "../site";

const contactItems = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: FaPhone,
    title: "Phone",
    value: "+234 802 342 3621",
    href: "tel:+2348023423621",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Location",
    value: "Lagos, Nigeria",
    href: "https://www.google.com/maps/search/?api=1&query=Lagos+Nigeria",
  },
];

const inputClass =
  "w-full rounded-xl border border-ink-600 bg-ink-950/60 px-4 py-3 text-white placeholder-ink-500 transition-colors focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 disabled:opacity-50";
const labelClass = "mb-2 block text-sm font-medium text-ink-200";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [copied, setCopied] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          type: "success",
          message: data.message || "Message sent! I'll get back to you soon.",
        });

        // Store email for visitor tracking
        localStorage.setItem("userEmail", formData.email);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setFormStatus({ type: "idle", message: "" });
        }, 6000);
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setFormStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const loading = formStatus.type === "loading";

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get In"
          accent="Touch"
          description="Ready to bring your ideas to life? Let's discuss your next project and create something great together."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            <div>
              <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                Let&apos;s connect
              </h3>
              <p className="leading-relaxed text-ink-300">
                Whether you have a project in mind, a role to fill, or just want
                to say hello, I&apos;d love to hear from you.
              </p>
            </div>

            <ul className="space-y-3">
              {contactItems.map((contact) => (
                <li key={contact.title}>
                  <a
                    href={contact.href}
                    {...(contact.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="group flex items-center gap-4 rounded-xl border border-ink-700/70 bg-ink-800/30 p-4 transition-colors hover:border-gold-500/40 hover:bg-ink-800/60"
                  >
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-lg text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-ink-950">
                      <contact.icon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-ink-400">
                        {contact.title}
                      </span>
                      <span className="block break-words font-medium text-ink-100">
                        {contact.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-gold-300 cursor-pointer"
            >
              {copied ? (
                <>
                  <FaCheck className="text-emerald-400" /> Email copied
                </>
              ) : (
                <>
                  <FaCopy /> Copy email address
                </>
              )}
            </button>

            <div className="flex gap-3 border-t border-ink-800 pt-6">
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink-700 text-xl text-ink-300 transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:text-gold-300"
                  >
                    <social.icon />
                  </a>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-ink-700/70 bg-ink-800/40 p-6 sm:p-8 lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className={inputClass}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className={inputClass}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className={inputClass}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className={inputClass}
                  placeholder="Project collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={6}
                  className={`${inputClass} resize-y`}
                  placeholder="Tell me about your project, timeline and budget..."
                ></textarea>
              </div>

              {formStatus.type !== "idle" && (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-4 text-sm ${
                    formStatus.type === "success"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : formStatus.type === "error"
                      ? "border-red-500/40 bg-red-500/10 text-red-300"
                      : "border-gold-500/40 bg-gold-500/10 text-gold-300"
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-4 font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-500/25 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Sending…" : "Send message"}
                <FaPaperPlane className="text-sm transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
