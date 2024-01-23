import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <PacmanLoader color="#36d7b7" />
    </div>
  );
}
