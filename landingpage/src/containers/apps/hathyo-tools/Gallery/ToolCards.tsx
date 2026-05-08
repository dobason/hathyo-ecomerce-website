"use client";
import React from "react";
import Button from "@/components/Button";

type Props = {
  header: string;
  keyMatch: string;
  content: string;
  setTool: React.Dispatch<React.SetStateAction<string | null>>;
};

function ToolCard({ header, keyMatch, content, setTool }: Props) {
  const onSelectTool = () => {
    setTool(keyMatch);
  };
  return (
    <div className="max-w-sm p-2 xl:p-6 gap-2 xl:gap-4 flex flex-col justify-between bg-Moss/50 border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col gap-2">
        <h5 className="heading-5 text-Moss/600">{header}</h5>
        <p className="body-semibol text-gray-700 dark:text-gray-400">
          {content}
        </p>
      </div>
      <Button className="w-full" type="primary" onClick={onSelectTool}>
        Khám phá thêm
      </Button>
    </div>
  );
}

export default ToolCard;
