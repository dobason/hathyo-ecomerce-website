import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import SegmentRoadMap from "@/components/Icons/SegmentRoadMap";

type Props = {
  data?: {
    heading?: string;
    content?: string;
  }[];
  containerWidth: number;
  containerHeight: number;
  containerRef: React.RefObject<HTMLDivElement>;
};

export default function PostRoadMapSmall({
  data = [],
  containerRef,
  containerWidth,
  containerHeight,
}: Props) {
  const [pathData, setPathData] = useState("");
  const [curvePoints, setCurvePoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const exactMidpoint = (
    currentX: number,
    currentY: number,
    currentDivHeight: number
  ) => {
    const midX = currentX + 20;
    const midY = currentY + (currentDivHeight - 40) / 2;

    return {
      x: midX,
      y: midY,
    };
  };

  useEffect(() => {
    if (containerWidth === 0) return;
    if (containerRef.current) {
      let path = "";
      let currentDirection = "right";
      const directions: string[] = [];
      const points: { x: number; y: number }[] = [];

      const container = containerRef.current;
      const segments = container.querySelectorAll<HTMLElement>(".segment");

      let currentX = segments[0].offsetLeft;
      let currentY = segments[0].offsetTop;

      segments.forEach((seg, index) => {
        const nextSeg = segments[index + 1];
        const isLastSegment = index === segments.length - 1;
        // Calculate Length for horizontal line
        const currentDivWith = seg.offsetWidth;
        const horizontalOffset = currentDivWith * 0.8;

        // Get Height of the Current Segment
        const currentDivHeight = seg.offsetHeight;

        directions.push(currentDirection);
        if (index === 0) {
          currentX = currentX;
          path += `M ${currentX} ${currentY}`;
          // Draw Horizontal Line
          path += `L ${currentX + horizontalOffset} ${currentY} `;
          currentX += horizontalOffset;
        }
        if (!isLastSegment) {
          const nextSegmentTopY = nextSeg.offsetTop;
          if (currentDirection === "right") {
            // Draw Arc
            path += `A ${40} ${40} 0 0 1 ${currentX + 40} ${currentY + 40} `;
            path += `L ${currentX + 40} ${currentY + currentDivHeight - 40} `;
            path += `A ${40} ${40} 0 0 1 ${currentX} ${
              currentY + currentDivHeight
            } `;
            const midpoint = exactMidpoint(
              currentX,
              currentY,
              currentDivHeight
            );
            points.push(midpoint);
            // Draw Horizontal Line
            path += `L ${currentX - horizontalOffset * 0.8} ${
              currentY + currentDivHeight
            } `;
            currentX -= horizontalOffset * 0.8;
            currentDirection = "left";
          } else {
            // Draw Arc
            path += `A ${40} ${40} 0 0 0 ${currentX - 40} ${currentY + 40} `;
            path += `L ${currentX - 40} ${currentY + currentDivHeight - 40} `;
            path += `A ${40} ${40} 0 0 0 ${currentX} ${
              currentY + currentDivHeight
            } `;
            const midpoint = exactMidpoint(
              currentX - 80,
              currentY,
              currentDivHeight
            );
            points.push(midpoint);
            // Draw Horizontal Line
            path += `L ${currentX + horizontalOffset * 0.8} ${
              currentY + currentDivHeight
            } `;
            currentX += horizontalOffset * 0.8;
            currentDirection = "right";
          }
          currentY = nextSegmentTopY;
        } else {
          if (currentDirection === "right") {
            // Draw Arc
            path += `A ${40} ${40} 0 0 1 ${currentX + 40} ${currentY + 40} `;
            path += `L ${currentX + 40} ${currentY + currentDivHeight - 40} `;
            path += `A ${40} ${40} 0 0 1 ${currentX} ${
              currentY + currentDivHeight
            } `;
            // Draw Horizontal Line
            path += `L ${currentX - horizontalOffset} ${
              currentY + currentDivHeight
            } `;
            currentX -= horizontalOffset;
            currentDirection = "left";
          } else {
            // Draw Arc
            path += `A ${40} ${40} 0 0 0 ${currentX - 40} ${currentY + 40} `;
            path += `L ${currentX - 40} ${currentY + currentDivHeight - 40} `;
            path += `A ${40} ${40} 0 0 0 ${currentX} ${
              currentY + currentDivHeight
            } `;
            // Draw Horizontal Line
            path += `L ${currentX + horizontalOffset} ${
              currentY + currentDivHeight
            } `;
            currentX += horizontalOffset;
            currentDirection = "right";
          }
          setEndPoint({ x: currentX, y: currentY + currentDivHeight });
        }
      });
      setPathData(path);
      setCurvePoints(points);
    }
  }, [data, containerWidth, containerRef]);

  return (
    <div className="relative grid grid-cols-1">
      <div className="py-8">
        {data.map((segment, index) => (
          <div
            key={index}
            className={classNames("max-w-[500px] segment grid text-left py-8", {
              "justify-items-start pl-12": index % 2 == 0,
              "justify-items-end pr-12": index % 2 != 0,
            })}
          >
            <div className="w-5/6 flex flex-col">
              <div
                className="heading font-semibold summary-heading xl:summary-heading-lg"
                dangerouslySetInnerHTML={{
                  __html: segment.heading || "",
                }}
              ></div>
              <div
                className="ml-5 content text-md summary-list mt-3"
                dangerouslySetInnerHTML={{
                  __html: segment.content || "",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <svg
        width="100%"
        height={containerHeight}
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        className="absolute top-0 left-0 z-0 pointer-events-none"
      >
        <path
          d={pathData}
          fill="none"
          stroke="#0B8249"
          strokeWidth="3"
          className="line-animation"
        />
        <circle cx={endPoint.x} cy={endPoint.y} r="15" fill="#0B8249" />
        {curvePoints.map((point, index) => (
          <svg key={index} height="100" width="100" x={point.x} y={point.y}>
            <SegmentRoadMap
              className="absolute w-16"
              fillColor={
                index == 0
                  ? "#FEC84B"
                  : index == 1
                  ? "#F5B848"
                  : index == 2
                  ? "#EDA845"
                  : index == 3
                  ? "#E49941"
                  : index == 4
                  ? "#DB893E"
                  : index == 5
                  ? "#D3793B"
                  : index == 6
                  ? "#CA6938"
                  : index == 7
                  ? "#C15A34"
                  : index == 8
                  ? "#B94A31"
                  : index == 9
                  ? "#B03A2E"
                  : index == 10
                  ? "#8D2E25"
                  : "#FEC84B"
              }
              isRight={index % 2 == 0}
              textInput={`0${index + 1}`}
            />
          </svg>
        ))}
        <foreignObject height="80" width="80" x={0} y={0}>
          <div className="p-2 w-14 h-14 flex justify-center border-2 border-Moss/400 items-center rounded-full bg-white">
            <Image
              src="/hathyo_logo_name.svg"
              alt="Hathyo logo"
              width={60}
              height={60}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
