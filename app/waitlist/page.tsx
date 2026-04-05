import type { Metadata } from "next";
import { WaitlistHero } from "@/components/ui/waitlist-hero";

export const metadata: Metadata = {
  title: "Join the Waitlist | Zooey",
  description: "Get early access to Zooey — your AI assistant, always on screen.",
};

export default function WaitlistPage() {
  return <WaitlistHero />;
}
