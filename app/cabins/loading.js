import SpinnerMini from "@/components/SpinnerMini";

export default function Loading() {
  return (
    <div className="grid justify-center items-center">
      <p className="text-xl text-primary-200">Loading cabin data</p>
      <SpinnerMini />;
    </div>
  );
}
