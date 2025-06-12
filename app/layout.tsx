import "./globals.css";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteMetadata } from "./metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    type: "website",
    locale: siteMetadata.siteLanguage,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.siteImage}`,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}${siteMetadata.siteImage}`],
    creator: "@dineshwayaman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/myimg.webp" sizes="any" />
        <link rel="canonical" href="https://dineshwayaman.com" />
        {/* Structured Data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dinesh Wayaman",
              url: "https://dineshwayaman.com",
              jobTitle: "Full-Stack Developer & UI/UX Designer",
              sameAs: [
                "https://twitter.com/dineshwayaman",
                "https://github.com/dineshwayaman",
                "https://linkedin.com/in/dineshwayaman",
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
