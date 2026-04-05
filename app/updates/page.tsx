import { UpdatesSection } from "@/components/landing/updates-section";

export const metadata = {
  title: "Changelog | Zooey",
  description: "Every update, version bump, and shipped feature. All in one place.",
};

export default function UpdatesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <UpdatesSection />
    </main>
  );
}
