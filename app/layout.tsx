import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0ea5e9", // Adjust based on portfolio accent
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Mohamed Emara | Full Stack Developer",
    template: "%s | Mohamed Emara",
  },
  description: "Full Stack Developer specializing in modern web technologies, React, Next.js, and Node.js. Explore my projects, skills, and experience.",
  keywords: ["Mohamed Emara", "Full Stack Developer", "Portfolio", "Web Development", "React", "Next.js"],
  authors: [{ name: "Mohamed Emara" }],
  creator: "Mohamed Emara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohamedemara.com", // Adjust if you have a real URL
    siteName: "Mohamed Emara Portfolio",
    title: "Mohamed Emara | Full Stack Developer",
    description: "Professional portfolio of Mohamed Emara, a passionate Full Stack Developer.",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in public folder or use an absolute URL
        width: 1200,
        height: 630,
        alt: "Mohamed Emara Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Emara | Full Stack Developer",
    description: "Professional portfolio of Mohamed Emara, a passionate Full Stack Developer.",
    images: ["/og-image.png"],
    creator: "@mohamedemara", // Adjust if you have a twitter handle
  },
  icons: {
    icon: "/image-profile.png",
    apple: "/image-profile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>

      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
