import { ResultLoader } from "@/components/result-loader";

/**
 * Soft-navigation loading state. It renders inside the root layout, so the
 * header and footer stay put and only the body swaps to the skeleton.
 */
export default function Loading() {
  return (
    <div className="py-10">
      <ResultLoader />
    </div>
  );
}
