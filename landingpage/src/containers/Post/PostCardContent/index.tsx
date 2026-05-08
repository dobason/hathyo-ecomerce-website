"use client";

import { Post } from "@/types/post";
import classNames from "classnames";
import React, { useRef, useState, useEffect } from "react";
import LargePostCard from "./LargePostCard";
import CKContent from "@/components/CKContent";
import RelatedPosts from "./RelatedPosts";
import PostRoadMapSmall from "./PostRoadMapSmall";
import PostRoadMapLarge from "./PostRoadMapLarge";
import Summary from "./Summary";

type Props = {
  data?: Post | undefined;
  id?: string | number;
  className?: string;
};

function PostCardContent({ data, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1280);
  const [containerHeight, setContainerHeight] = useState(800);

  useEffect(() => {
    const container = containerRef.current;
    console.log("container", container);
    if (container) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentRect.width;
          const newHeight = entry.contentRect.height + 100;
          setContainerWidth(newWidth);
          setContainerHeight(newHeight);
        }
      });

      resizeObserver.observe(container);

      return () => {
        if (container) resizeObserver.unobserve(container);
      };
    }
  }, [containerRef, showRoadmap]);

  return (
    <div
      className={classNames("xl:flex xl:flex-row xl:gap-8", {
        className: !!className,
      })}
    >
      <div className="xl:w-8/12 gap-4 w-full">
        <LargePostCard
          data={data}
          showRoadmap={showRoadmap}
          setShowRoadmap={setShowRoadmap}
        />
        {data?.indexOfContent && showRoadmap && (
          <div
            className={classNames("w-full px-2 xl:p-16", {
              hidden: !showRoadmap,
            })}
            ref={containerRef}
          >
            {showRoadmap &&
              (containerWidth <= 768 ? (
                <PostRoadMapSmall
                  containerRef={containerRef}
                  data={data?.indexOfContent}
                  containerWidth={containerWidth}
                  containerHeight={containerHeight}
                />
              ) : (
                <PostRoadMapLarge
                  containerRef={containerRef}
                  data={data?.indexOfContent}
                  containerWidth={containerWidth}
                  containerHeight={containerHeight}
                />
              ))}
          </div>
        )}
        <CKContent data={data?.content} />
      </div>
      <div className="flex flex-col gap-4 xl:w-4/12 w-full">
        <Summary data={data?.indexOfContent} />
        {data?.relatedPosts && (
          <RelatedPosts title="Bài viết liên quan" data={data?.relatedPosts} />
        )}
      </div>
    </div>
  );
}

export default PostCardContent;
