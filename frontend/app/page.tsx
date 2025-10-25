"use client";

import LetterGlitch from "@/components/LetterGlitch";
import Image from "next/image";

import authChainIcon from "./authChain.svg";
export default function Home() {
  return (
    <div className="h-screen bg-black flex items justify-center">
      <div></div>

      <div className="relative w-fulll h-[750px] ">
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-4xl font-style-inter font-bold pointer-events-none">
          <Image
            src={authChainIcon}
            width={50}
            height={50}
            alt="pranav was here"
            className=""
          />
          AUTH CHAIN
        </div>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
          glitchColors={["#7d319f", "#00FFFF"]}
        />
      </div>
    </div>
  );
}
