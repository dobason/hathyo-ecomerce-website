/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import Rating from "@/components/Rating";
import classNames from "classnames";
import React, { memo, useEffect, useState } from "react";
import { debounce, isEmpty, map } from "lodash";
import {
  getProductComments,
  postProductComment,
} from "@/services/client/product";
import CommentItem from "../Post/CommentItem";

type Props = {
  className?: string;
  id: string | number;
};

const renderCommentItem: any = ({ id, data, fetchComment, curPage }: any) => {
  return map(data, (item) => {
    if (isEmpty(item?.reply)) {
      return (
        <CommentItem
          postId={id}
          key={item?.id}
          title={item?.author}
          rate={item?.rate}
          content={item?.content}
          commentId={item?.id}
          reply={item?.reply}
          fetchComment={() => fetchComment({ curPage })}
        />
      );
    }
    return (
      <div>
        <CommentItem
          postId={id}
          key={item?.id}
          title={item?.author}
          rate={item?.rate}
          content={item?.content}
          commentId={item?.id}
          reply={item?.reply}
          fetchComment={fetchComment}
        />
        <div className="ml-6">
          {renderCommentItem({ id, data: [item?.reply], fetchComment })}
        </div>
      </div>
    );
  });
};

function Comment({ id, className }: Props) {
  const [rate, setRate] = useState(5);
  const [content, setContent] = useState("");
  const [curPage, setCurPage] = useState(0);
  const [data, setData] = useState({} as any);

  const fetchComment = async ({ page = 0 }: any) => {
    try {
      const response = await getProductComments({
        id,
        params: { page, size: 10 },
      });
      setData(response as any);
    } catch (error) {
      console.log(error);
    }
  };

  const onComment = debounce(async () => {
    if (!content) return;
    setContent("");
    await postProductComment({ id, body: { rate, content } });
    fetchComment({ page: 0 });
  }, 500);

  useEffect(() => {
    fetchComment({ page: curPage });
  }, [curPage]);

  return (
    <div
      className={classNames(
        "my-6 p-6 bg-white rounded-xl shadow-Shadow/md",
        className
      )}
    >
      <div className="text-xl font-bold text-Moss/700 mb-3">
        Đánh giá sản phẩm
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e?.target?.value)}
        placeholder="Bạn nghĩ gì về bài viết này?"
        className="focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50 placeholder:text-Grayiron/300 placeholder:text-md text-Grayiron/600 border-Grayiron/200 resize-y rounded-xl w-full min-h-[150px] xl:min-h-[200px] mb-3"
      />
      <div className="flex flex-col items-end justify-end">
        <Rating setValue={setRate} value={rate} className="mb-4" />
        <Button disabled={!content} type="primary" onClick={onComment}>
          Gửi bình luận
        </Button>
      </div>

      <hr className="my-6" />

      <div className="flex flex-row justify-end">
        {/* <Button type="secondary" className="text-Moss/600">
          Bình luận hàng đầu <ArrowDown className="inline-block" />
        </Button> */}
        <Pagination
          totalPages={data?.totalPages}
          currentPage={data?.currentPage}
          setCurPage={setCurPage}
        />
      </div>
      <div className="mt-5">
        {renderCommentItem({ id, data: data?.comments, fetchComment, curPage })}
      </div>
    </div>
  );
}

export default memo(Comment);
