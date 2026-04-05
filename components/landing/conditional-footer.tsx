"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/landing/footer";

const HIDDEN_ON = ["/waitlist"];

export function ConditionalFooter() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <Footer />;
}
