import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  BlogDate: string;
  BlogTitle: string;
  BlogDesc: string;
  ReadTime: string;
  TimeDuration: string;
  slug: string;
  coverBlog: Array<{
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
    };
    url: string;
  }>;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  } catch {
    return "";
  }
};

const getBestImageUrl = (images: BlogCardProps['coverBlog']) => {
  if (!images || images.length === 0) return null;
  const img = images[0];
  return img?.formats?.small?.url || img?.url; // Prefer smaller images
};

const BlogCard: React.FC<BlogCardProps> = ({
  BlogDate,
  BlogTitle,
  BlogDesc,
  ReadTime,
  TimeDuration,
  slug,
  coverBlog,
}) => {
  const formattedDate = formatDate(BlogDate);
  const imageUrl = getBestImageUrl(coverBlog);

  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#F5DE191A] p-2 space-y-1">
      {imageUrl && (
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
          <Image
            src={`http://localhost:1337${imageUrl}`}
            alt={BlogTitle}
            fill
            style={{ objectFit: "cover" }}
            quality={75}
            loading="lazy"
            priority={false}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader className="p-2 px-4">
        <div className="flex items-center text-xs text-gray-600 gap-1">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{ReadTime}</span>
          <span>•</span>
          <span>{TimeDuration}</span>
        </div>
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
          {BlogTitle}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-2 px-4">
        <CardDescription className="text-gray-700 text-sm sm:text-base line-clamp-3">
          {BlogDesc}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-1 flex justify-start px-4">
        <Link href={`/blog/${slug}`} passHref>
          <Button
            variant="default"
            className="w-fit bg-[#073F27] text-[#F5DE19] hover:bg-[#05291A] transition px-3 py-1 text-xs sm:text-sm"
          >
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;