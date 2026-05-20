import { Navbar } from "@/components/navbar";
import { ButtonGroup } from "./button-group";

export default function Page2() {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-semibold">Page 2</h1>
        <p>11</p>
        <ButtonGroup />
      </div>
    </>
  );
}
