import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displaySerif = Playfair_Display({
  variable: "--font-display-serif",
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
      knowsAbout: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS", "Frontend development"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable} antialiased`}
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
