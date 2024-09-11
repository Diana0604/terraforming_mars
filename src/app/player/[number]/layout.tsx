import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
  params: { number: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className={inter.className}>
      <Providers number={Number(params.number)}>{children}</Providers>
    </div>
  );
}
