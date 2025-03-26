"use client";
import React, { useEffect, useState } from "react";
import { useBlogStore } from "@/app/stores/blogStore";
import PageLayout from "@/app/components/PageLayout/PageLayout";
import NewsletterSection from "../components/Newsletter/Newsletter";
import Footer from "../components/footer/footer";
import BlogCard from "../components/shapes/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";


export default function BlogPage() {
  const {
    data,
    loading,
    error,
    fetchBlogData,
    totalPages,
    currentPage,
    setPage,
  } = useBlogStore();
  const [bgImageUrl, setBgImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 6;

  useEffect(() => {
    fetchBlogData(currentPage, pageSize);
  }, [currentPage, fetchBlogData]);

  useEffect(() => {
    if (data && data.length > 0) {
      const blogWithBg = data.find((blog) => blog.blogbg?.url);
      if (blogWithBg?.blogbg?.formats?.large?.url) {
        setBgImageUrl(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}${blogWithBg.blogbg.formats.large.url}`
        );
      }
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) setPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1} onClick={() => handlePagination(1)}>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) items.push(<PaginationEllipsis key="ellipsis-start" />);
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page} onClick={() => handlePagination(page)}>
          <PaginationLink isActive={page === currentPage}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) items.push(<PaginationEllipsis key="ellipsis-end" />);
      items.push(
        <PaginationItem key={totalPages} onClick={() => handlePagination(totalPages)}>
          <PaginationLink>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <PageLayout
      title="Blog & News"
      bgImageUrl={bgImageUrl}
      loading={loading || isLoading}
      error={error}
    >
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        {!loading && !error && data && data.length > 0 && (
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073F27] mb-4 relative after:content-[''] after:block after:w-16 after:h-2 after:bg-yellow-500 after:mt-1">
              {data[0].News}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              {data[0].NewsDesc}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data?.map((blog) => (
            <BlogCard
              key={blog.id}
              BlogDate={blog.BlogDate}
              BlogTitle={blog.BlogTitle}
              BlogDesc={blog.BlogDesc[0]?.children[0]?.text || "No description available"}
              ReadTime={blog.ReadTime || "Unknown"}
              TimeDuration={blog.TimeDuration || "Unknown"}
              slug={blog.slug}
              coverBlog={blog.coverBlog}
            />
          ))}
        </div>

        <Pagination className="mt-6 sm:mt-8">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePagination(currentPage - 1)}
              isActive={currentPage > 1}
              className={`px-3 py-1 sm:px-4 sm:py-2 ${
                currentPage <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500"
              } text-white rounded-lg`}
            />
            {renderPaginationItems()}
            <PaginationNext
              onClick={() => handlePagination(currentPage + 1)}
              isActive={currentPage < totalPages}
              className={`px-3 py-1 sm:px-4 sm:py-2 ${
                currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500"
              } text-white rounded-lg`}
            />
          </PaginationContent>
        </Pagination>
      </div>

      <NewsletterSection />
      <Footer />
    </PageLayout>
  );
}