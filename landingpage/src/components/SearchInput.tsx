"use client";

import classNames from "classnames";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import Button from "./Button";
import SearchIcon from "./Icons/SearchIcon";
import qs from "qs";

type Props = {
  className?: string;
  placeholder?: string;
  suffixButton?: boolean;
  defaultValue?: string;
};

function SearchInput({
  placeholder,
  className,
  suffixButton,
  defaultValue,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [keyword, setKeyword] = useState("");

  const onSubmit = () => {
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.push(
        `/product?${qs.stringify({
          ...qs.parse(searchParams.toString()),
          query: keyword,
        })}`
      );
    });
  };

  return (
    <div
      className={classNames(
        "rounded-lg px-2 py-2  bg-Moss/50 flex flex-row flex-nowrap items-center",
        className
      )}
    >
      <input
        className="flex-1 pl-1 py-0 focus:ring-transparent placeholder:text-Moss/500 placeholder:font-normal pr-1 !border-Moss/50 bg-Moss/50 text-Moss/500 text-md outline-none font-normal"
        disabled={isPending}
        onChange={debounce((e) => {
          setKeyword(e?.target.value);
        }, 100)}
        onKeyDown={(e) => (e?.code === "Enter" ? onSubmit() : undefined)}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {suffixButton ? (
        <Button type="primary" onClick={onSubmit} size="small">
          Tìm kiếm
        </Button>
      ) : (
        <span onClick={onSubmit}>
          <SearchIcon className="inline-block" />
        </span>
      )}
    </div>
  );
}

export default SearchInput;
