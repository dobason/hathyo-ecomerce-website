import StaticBanner from "@/components/StaticBanner";
import Container from "@/containers/helps/affiliate-marketing/Container";
import { Metadata } from "next";

export default function Page() {
  return (
    <main>
      <StaticBanner />
      <Container />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hathyo.com - Tiếp thị liên kết với Hathyo",
  };
}
