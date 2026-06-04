import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./jodit-custom.css";
// import "react-phone-input-2/lib/style.css";
import ThemeProvider from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import CheckToken from "@/lib/check-token";
import { Figtree } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "CV-Admin",
  description: "CV-Admin description",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const notoFont = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "fa";
  const dir = lang === "fa" ? "rtl" : "ltr";

  return (
    <html dir={dir} lang={lang}>
      <body className={`${figtree.variable} ${notoFont.variable} font-figtree`}>
        <ThemeProvider>
          {children}
          <Toaster />
          {/* <CheckToken /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
