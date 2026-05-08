"use client";

import { memo } from "react";
import List from "./List";

function PostSearch() {
  return (
    <div>
      <List id={1} />
    </div>
  );
}

export default memo(PostSearch);
