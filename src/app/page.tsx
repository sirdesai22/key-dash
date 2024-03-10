import Image from "next/image";
import Display from "./components/Display";

export default function Home() {
  return (
    <>
    <div className=" w-full bg-[#252525] bg-dot-white/[0.6] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col justify-center items-center h-screen w-full z-10">
        <Display/>
      </div>
      </div>
    </>
  );
}
