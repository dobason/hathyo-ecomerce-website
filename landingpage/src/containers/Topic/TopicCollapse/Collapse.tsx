"use client";
import React, { memo, useState } from "react";
import ArrowRight from "@/components/Icons/ArrowRight";
import ArrowDown from "@/components/Icons/ArrowDown";
import { includes, isEmpty, map } from "lodash";
import { useParams, useRouter } from "next/navigation";
import classNames from "classnames";

type Props = {
  title?: string | undefined;
  icon?: string | undefined;
  id?: string | undefined;
  onNavigate?: any;
  childTopics?: any;
  currentIndex?: number | undefined;
  currentId?: number | undefined;
  isMain?: boolean;
  onSetTopic?: any;
};

function Collapse({
  title,
  id,
  icon,
  childTopics,
  isMain,
  currentIndex,
  currentId,
  onSetTopic,
}: Props) {
  const { id: topicParamId } = useParams();
  const topicId = currentId || topicParamId;

  const [visible, setVisible] = useState(
    Number(id) === Number(topicId) ||
      includes(JSON.stringify(childTopics), `":${topicId},`)
  );

  const onToggle = () => setVisible(!visible);

  const router = useRouter();

  return (
    <div>
      <div
        className={classNames(
          "flex flex-row justify-between items-center cursor-pointer flex-wrap",
          {
            "pl-3": !isMain,
          }
        )}
      >
        <div
          className={classNames(
            "w-full flex flex-row justify-between items-center p-3 cursor-pointer xl:border-b-Moss/100 xl:border-b-[0.5px]",
            {
              "hover:bg-Moss/50 xl:hover:border-l-Moss/400 xl:hover:border-l-[5px]":
                isMain,
              // "": !isMain,
              "bg-Moss/50 xl:border-l-Moss/400 xl:border-l-[5px] ":
                isMain &&
                (Number(id) === Number(topicId) ||
                  includes(JSON.stringify(childTopics), `":${topicId},`)),
              "rounded-tl-lg rounded-tr-lg": isMain && currentIndex === 0,
            }
          )}
        >
          <div className="w-full flex flex-row justify-start">
            {icon}
            <div
              onClick={() =>
                onSetTopic ? onSetTopic(id) : router.push(`/topic/${id}`)
              }
              className={classNames(
                "w-full text-md text-Grayiron/500 font-medium hover:text-Moss/400",
                {
                  "text-Grayiron/500": Number(id) !== Number(topicId),
                  "text-Moss/400":
                    Number(id) === Number(topicId) ||
                    includes(JSON.stringify(childTopics), `":${topicId},`),
                }
              )}
            >
              {title}
            </div>
          </div>
          {!isEmpty(childTopics) && (
            <div onClick={onToggle}>
              {visible ? <ArrowDown /> : <ArrowRight />}
            </div>
          )}
        </div>
        {isEmpty(childTopics)
          ? null
          : visible && (
              <div className="w-full flex flex-col cursor-pointer">
                {map(childTopics, (item, index: number) => (
                  <Collapse
                    key={index}
                    id={item?.id}
                    title={item?.name}
                    childTopics={item?.childTopics}
                    onSetTopic={onSetTopic}
                    currentId={currentId}
                  />
                ))}
              </div>
            )}
      </div>
    </div>
  );
}

export default memo(Collapse);
