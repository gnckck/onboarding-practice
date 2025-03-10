import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"; // 스피너 크기
  fullHeight?: boolean; // 전체 높이 사용 여부
  className?: string; // 추가 스타일링을 위한 className
  loaderClassName?: string; // 로더 스타일링을 위한 className
}

export function LoadingSpinner({
  size = "md",
  fullHeight = true,
  className = "",
  loaderClassName = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        fullHeight ? "min-h-[50vh]" : ""
      } w-full ${className}`}
    >
      <Loader2
        className={`${sizeClasses[size]} animate-spin ${loaderClassName}`}
      />
    </div>
  );
}
