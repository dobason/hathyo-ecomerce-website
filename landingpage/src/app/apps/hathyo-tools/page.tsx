import { Metadata } from "next";
import Container from "@/containers/apps/hathyo-tools/Container";

export default function Page() {
  return (
    <main>
      <Container />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hathyo.com - Công cụ vui khỏe Hathyo",
  };
}
