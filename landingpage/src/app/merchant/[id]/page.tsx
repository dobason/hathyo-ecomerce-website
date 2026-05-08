import Container from "@/containers/Merchant/Container";
import { getMerchantInfoClient } from "@/services/client/merchant";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getDetail(id: string) {
  const res = await getMerchantInfoClient({ id });
  if (!res) notFound();
  return res;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await getMerchantInfoClient({ id });

  return {
    title: res.storeName,
    icons: {
      icon: "/img/brand/favicon.ico",
      shortcut: "/img/brand/favicon.ico",
      apple: "/img/brand/favicon.ico",
    },
    description: res.shortDescription,
    openGraph: {
      images: [res.logo],
      title: res.storeName,
    },
    twitter: {
      images: [res.logo],
      title: res.storeName,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const data = await getDetail(id);

  return (
    <main>
      <Container id={id} data={data} />
    </main>
  );
}
