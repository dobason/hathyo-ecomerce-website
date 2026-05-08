import SearchHelp from "../SearchHelp";
import Image from "next/image";

export default async function StaticBanner() {
  return (
    <div className="relative">
      <Image
        className="w-full h-[30vh] object-cover"
        alt="main banner"
        src="/banner.png"
        width="800"
        height="800"
      />
      <div className="w-full h-full flex justify-center items-center absolute top-0">
        <div className="container m-auto flex flex-row justify-between xl:px-8 px-2">
          <div className="w-full justify-center flex flex-col">
            <div className="text-white xl:text-4xl text-base my-6 text-center">
              Xin chào! Hathyo có thể giúp gì cho bạn?
            </div>
            <SearchHelp
              placeholder="Nhập từ khóa hoặc nội dung cần tim"
              suffixButton
              className="xl:flex"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
