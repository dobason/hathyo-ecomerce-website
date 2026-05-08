"use server";

import StaticBanner from "@/components/StaticBanner";
import Container from "@/containers/StaticContent/Container";
import { Metadata } from "next";
import { getContent } from "@/services/server/content";

export default async function Page({ params: { code = "" } }) {
  const contentDetail = await getHelps(code);
  return (
    <main>
      <StaticBanner />
      <Container data={contentDetail} />
    </main>
  );
}

async function getHelps(code: string) {
  const res = await getContent({ params: { code } });
  const content = await res;
  if (!content) return [];
  return content;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hathyo.com - Tiếp thị liên kết với Hathyo",
  };
}
