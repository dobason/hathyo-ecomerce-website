import { MerchantResponse } from "@/types";
import MerchantInfo from "../Product/MerchantInfo";
import TabContainer from "./TabContainer";
type Props = {
  className?: string;
  id: string | number;
  data: MerchantResponse;
};

export default function Container({ id, data }: Props) {
  return (
    <main>
      <div className="container m-auto">
        <MerchantInfo
          banner="/banner.png"
          logo={data.logo ?? "/logo.svg"}
          storeName={data.storeName ?? ""}
          rating={data?.rating}
          numOfTotalProducts={data?.numOfTotalProducts}
          numOfFollowers={data?.numOfFollowers}
          createdAt={data?.createdAt}
        />
        <TabContainer data={data} id={id} />
      </div>
    </main>
  );
}
