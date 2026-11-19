import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import VisitorTracker from "./components/VisitorTracker";
import EmailCapture from "./components/EmailCapture";
import {
  EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  socials,
} from "./components/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Victor Ezike",
    "Ezike Victor",
    "Victor Ezike portfolio",
    "Software Engineer",
    "React developer",
    "Next.js developer",
    "React Native",
    "Full-stack developer",
    "Backend developer",
    "C# .NET developer",
    "ASP.NET Core",
    "Node.js developer",
    "PHP developer",
    "Lagos",
    "Nigeria",
  ],
  // Point search engines at the canonical URL, whichever alias the visitor used
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "profile",
    firstName: "Victor",
    lastName: "Ezike",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // Set GOOGLE_SITE_VERIFICATION in Vercel to verify the site in Google Search Console
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

// Structured data so search engines understand this site is about Victor Ezike
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      givenName: "Victor",
      familyName: "Ezike",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: "Software Engineer",
      worksFor: { "@type": "Organization", name: "Xown Solutions" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      email: `mailto:${EMAIL}`,
      knowsAbout: ["React", "Next.js", "TypeScript", "React Native", "C#", ".NET", "ASP.NET Core", "Node.js", "PHP", "SQL Server", "Tailwind CSS", "Full-stack development", "Backend development"],
      sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

// Runs before the page paints, so the saved (or system) theme applies with no flash
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <VisitorTracker />
        <EmailCapture />
        {children}
      </body>
    </html>
  );
}
