import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export const SITE_URL = "https://victor-ezike.vercel.app";
export const SITE_NAME = "Victor Ezike";
export const SITE_TITLE = "Victor Ezike | Software Engineer";
export const SITE_DESCRIPTION =
  "Victor Ezike is a Software Engineer in Lagos, Nigeria, building fast, polished full-stack web and mobile products with React, Next.js, TypeScript, React Native, C#/.NET, Node.js and PHP.";

export const RESUME_PATH = "/Victor_Ezike_Resume.pdf";
export const RESUME_FILENAME = "Victor_Ezike_Resume.pdf";
export const EMAIL = "ezikevictor11@gmail.com";

// Social profiles (used on the site and in the emails)
export const GITHUB_URL = "https://github.com/victorezike";
export const LINKEDIN_URL = "https://www.linkedin.com/in/victor-ezike/";
export const INSTAGRAM_URL = "https://www.instagram.com/victor_ezike/";

export const socials = [
  { icon: FaGithub, href: GITHUB_URL, label: "GitHub" },
  {
    icon: FaLinkedin,
    href: LINKEDIN_URL,
    label: "LinkedIn",
  },
  { icon: FaInstagram, href: INSTAGRAM_URL, label: "Instagram" },
  { icon: FaEnvelope, href: `mailto:${EMAIL}`, label: "Email" },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "newsletter", label: "Newsletter" },
  { id: "contact", label: "Contact" },
];
