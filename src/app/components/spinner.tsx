import { Loader2 } from "lucide-react";

export default function Spinner({
  size = 24,
  color = "text-primary",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div role="status">
      <Loader2
        className={`animate-spin ${color} block `}
        style={{ width: size, height: size }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
