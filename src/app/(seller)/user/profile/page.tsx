import React from "react";
import defaultProfileImage from "@/assets/default-avatar.jpg";
import { Image } from "@mantine/core";

export default function UserProfile() {
  return (
    <div>
      <div className="pt-12 relative mt-[50px] flex items-center rounded-2xl justify-center bg-[#228BE61a]">
        <Image
          src={defaultProfileImage.src}
          className="w-[100px] rounded-full h-[100px]bg-[rgb(255,255,255)] absolute top-[-50px] border-[3px] border-solid border-green"
          alt=""
        />
        <h1 className="text-[18px] mb-6 mt-3">Нозимджон Шамсуллоев</h1>
      </div>
    </div>
  );
}
