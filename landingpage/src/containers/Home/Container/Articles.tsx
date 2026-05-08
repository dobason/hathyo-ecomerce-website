import { get, map } from "lodash";
import classNames from "classnames";
import PostCard from "@/components/PostCard";
import { useMediaQuery } from "react-responsive";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import post from "@/utils/post.json";

export default function Articles({ data }: any) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className="xl:grid xl:grid-flow-col xl:grid-cols-7 gap-4 xl:gap-8 xl:my-8 my-6">
      {isTabletOrMobile ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1.2}
          spaceBetween={4}
          className="mySwiper"
          navigation={false}
        >
          {map(data, (item, index) => (
            <SwiperSlide key={item.id}>
              <PostCard type="image" data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        map(data, (item, idx: number) => (
          <PostCard
            key={item.id}
            className={classNames({
              "xl:col-span-2": idx !== 1,
              "xl:row-span-2 xl:col-span-3": idx === 1,
            })}
            type="image"
            data={item}
          />
        ))
      )}
    </div>
  );
}
