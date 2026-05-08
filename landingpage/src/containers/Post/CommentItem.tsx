/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/Button";
import User from "@/components/Icons/User";
import Rating from "@/components/Rating";
import { postComment } from "@/services/client/post";
import { debounce } from "lodash";
import React, { useState } from "react";

type Props = {
  content?: string;
  title?: string;
  className?: string;
  createdAt?: string;
  avatar?: string;
  rate?: number;
  postId?: number | string;
  commentId?: number | string;
  fetchComment?: any;
  reply?: any;
};

function CommentItem({
  className,
  title,
  content,
  createdAt,
  avatar,
  rate,
  postId,
  commentId,
  fetchComment,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  const onToggle = () => setVisible(!visible);

  const onComment = debounce(async () => {
    if (!comment) return;
    try {
      setComment("");
      await postComment({
        id: postId,
        body: { content: comment, commentId },
      });
      fetchComment();
    } catch (error) {
      console.log(error);
    }
  }, 500);

  return (
    <article className={className}>
      <div className="flex items-start mb-5 ">
        {avatar ? (
          <img
            className="w-[55px] h-[55px] me-4 rounded-full"
            src={avatar}
            alt="user avatar"
          />
        ) : (
          <User className="w-10 h-10 me-4 rounded-full" />
        )}
        <div className="font-semibold text-xl text-Grayiron/600 w-full">
          {title || "Người dùng ẩn danh"}
          <time
            dateTime="2014-08-16 19:00"
            className="block text-md text-Grayiron/400"
          >
            {createdAt}
          </time>
          {!!rate && (
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              <Rating size="small" value={rate} />
            </div>
          )}
          <p className="text-base text-Grayiron/600">{content}</p>
          <div className="mt-2">
            <div
              onClick={onToggle}
              className=" cursor-pointer text-md text-Grayiron/400"
            >
              Reply
            </div>
            {visible && (
              <div className="mt-2 w-full">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e?.target?.value)}
                  placeholder="Bạn nghĩ gì về bài viết này?"
                  className="focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50 placeholder:text-Grayiron/300 placeholder:text-md text-Grayiron/600 border-Grayiron/200 resize-y rounded-xl w-full min-h-[150px] xl:min-h-[200px] mb-3 font-medium"
                />
                <div className="flex flex-col items-end justify-end">
                  <Button
                    disabled={!comment}
                    type="primary"
                    onClick={onComment}
                  >
                    Gửi bình luận
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CommentItem;
