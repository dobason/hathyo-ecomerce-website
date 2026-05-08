import StaticBanner from "@/components/StaticBanner";
import Container from "@/containers/terms/return-policy/Container";
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
    title: "Hathyo.com - Chính sách đổi trả hàng",
  };
}
