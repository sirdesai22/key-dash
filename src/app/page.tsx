import Image from "next/image";
import Display from "./components/Display";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Display/>
      </div>
    </>
  );
}
