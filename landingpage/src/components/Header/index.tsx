import React from "react";
import { getTopics } from "@/services/server/topic";

import Header from "./Header";

async function HeaderMain() {
  const { topics } = await getTopics();

  return <Header topics={topics} />;
}

export default HeaderMain;
