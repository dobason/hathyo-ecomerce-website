import StaticBanner from "@/components/StaticBanner";
import Container from "@/containers/info/careers/Container";
import { Metadata } from "next";

export default async function Page() {
  // const { blocks, SEO } = homepageData;
  return (
    <main>
      <StaticBanner />
      <Container />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hathyo.com - Tuyển dụng Hathyo",
  };
}
