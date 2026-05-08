import React from "react";
import classNames from "classnames";

type Props = {
  data: any;
  className?: string;
};

function CKContent({ data, className }: Props) {
  if (!data) return null;

  return (
    <div className={classNames("ck-content font-content", className)}>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}

export default CKContent;
