// import Banner from "@/containers/Home/Banner";
import Container from "@/containers/helps/tcxh/Container";
import StaticBanner from "@/components/StaticBanner";
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
    title: "Hathyo.com - Phản ánh của Tổ chức xã hội",
  };
}
