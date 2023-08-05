import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SidebarMenuList from "@/components/SidebarMenuList";
import NavbarDrawer from "@/components/NavbarDrawer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

export const metadata: Metadata = {
  title: "AsyikNonton - Nonton Film Subtitle Indonesia",
  description: "Nonton film subtitle Indonesia dengan kualitas HD secara gratis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={poppins.className}>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <NavbarDrawer />
            {/* Page content here */}

            <div className="p-6 md:px-[100px]">{children}</div>
          </div>
          <SidebarMenuList />
        </div>
      </body>
    </html>
  );
}
