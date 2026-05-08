import React from "react";
import Image from "next/image";

function Updating() {
  return (
    <main>
      <div className="container m-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="w-3/4 flex flex-row my-5 justify-center">
            <Image
              className="w-2/3 h-1/3 object-cover"
              alt="main banner"
              src="/update.svg"
              width="600"
              height="600"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Updating;
