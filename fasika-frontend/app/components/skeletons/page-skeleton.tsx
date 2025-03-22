'use client';
import { Skeleton } from "@/components/ui/skeleton";

export const PageSkeleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px] bg-gray-200" />
        <Skeleton className="h-4 w-[300px] bg-gray-200" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full bg-gray-200 rounded-lg" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-4/5 bg-gray-200" />
            <Skeleton className="h-4 w-3/5 bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};