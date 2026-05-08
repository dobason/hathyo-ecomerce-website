/* eslint-disable prettier/prettier */
import React from "react";
import Image from "next/image";

function Container() {
  return (
    <main>
      <section className="bg-white py-64 relative">
        <div className="shape7">
          <Image
            width={220}
            height={220}
            quality={100}
            src="/images/shape/shape7.png"
            alt="shape"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tải ứng dụng Hathyo
              </h2>
              <div className="w-20 h-1 bg-blue-500 mb-6 bar"></div>
              <p className="text-gray-600 mb-6">
               Cùng Hathyo sống khỏe mỗi ngày! Tải ngay ứng dụng để tham gia vào cộng đồng vui khỏe và cải thiện chất lượng cuộc sống
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://hathyo-app-apk.s3.ap-southeast-1.amazonaws.com/hathyo_8_2.apk"
                  className="inline-flex items-center bg-green-500 text-white px-4 md:px-6 py-1 md:py-3 rounded-lg hover:bg-green-600 transition"
                >
                  <i className="icofont-brand-android-robot mr-2 text-xl" />
                  <div>
                    <div className="text-xs">Khả dụng Trên</div>
                    <div className="font-bold">Google Store</div>
                  </div>
                </a>
               <div className="inline-flex items-center bg-gray-400 text-white px-4 md:px-6 py-1 md:py-3 rounded-lg cursor-not-allowed opacity-70">
                  <i className="icofont-brand-apple mr-2 text-xl" />
                  <div>
                    <div className="text-xs">Sắp ra mắt</div>
                    <div className="font-bold">Apple Store</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="app-download">
                <div className="download-image">
                  <Image
                    src="/images/app/app-img1.png"
                    alt="App Image 1"
                    className="w-[200px] md:w-[320px] xl:w-[445px] h-auto left-0 md:left-[-64px] xl:left-[-75px] top-[32px] md:top-0 absolute z-20"
                    width={1280}
                    height={1280}
                    quality={100}
                  />
                  <Image
                    src="/images/app/app-img2.png"
                    alt="App Image 2"
                    className="w-[180px] md:w-[300px] xl:w-[425px] h-auto left-[120px] md:left-[200px] xl:left-[225px] top-[48px] md:top-[25px] absolute z-10"
                    width={1280}
                    height={1280}
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Container;
