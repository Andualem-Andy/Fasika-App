"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/app/components/PageLayout/PageLayout";
import Footer from "@/app/components/footer/footer";
import BlogCard from "@/app/components/shapes/BlogCard";
import { BlogData, ImageData } from "@/app/stores/blogStore";
import { PageSkeleton } from "@/app/components/skeletons/page-skeleton";
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import { FaX } from 'react-icons/fa6';

// Type definitions
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";



interface Author {
  name: string;
  bio?: string;
  avatarUrl: string;
}

// Helper function to safely get image URLs
const getBestImageUrl = (image: ImageData): string => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';
  
  if (image.formats?.large?.url) return `${baseUrl}${image.formats.large.url}`;
  if (image.formats?.medium?.url) return `${baseUrl}${image.formats.medium.url}`;
  if (image.formats?.small?.url) return `${baseUrl}${image.formats.small.url}`;
  if (image.url) return `${baseUrl}${image.url}`;
  
  return '/default-blog-image.jpg';
};

// Helper function to get author data
const getAuthorData = (blog: BlogData): Author => {
  const authorImage = blog.Authorimg || blog.Authorimg;
  return {
    name: blog.authorName || "Unknown Author",
    bio: blog.AuthorBio,
    avatarUrl: authorImage?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${authorImage.url}`
      : '/default-avatar.jpg'
  };
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bgImageUrl, setBgImageUrl] = useState<string>("/default-bg.jpg");
  const [relatedPosts, setRelatedPosts] = useState<BlogData[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (!result.data || result.data.length === 0) throw new Error("Blog not found");

        const blogData = result.data[0];
        setBlog(blogData);

        if (blogData.blogbg?.formats?.large?.url) {
          setBgImageUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}${blogData.blogbg.formats.large.url}`);
        }

        const relatedResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$ne]=${slug}&pagination[limit]=3&populate=*&sort=createdAt:desc`
        );
        if (relatedResponse.ok) {
          const relatedResult = await relatedResponse.json();
          setRelatedPosts(relatedResult.data || []);
        }

        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Social Sharing Buttons Component with X
  const SocialSharingButtons = ({ title, url }: { title: string; url: string }) => {
    const shareUrl = encodeURIComponent(url);
    const shareText = encodeURIComponent(title);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Share this article</h3>
        <div className="flex space-x-4">
          {/* X (formerly Twitter) */}
          <a
            href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Share on X"
          >
            <FaX size={18} />
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] text-white p-3 rounded-full hover:bg-[#166fe5] transition-colors"
            aria-label="Share on Facebook"
          >
            <FaFacebookF size={18} />
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0077B5] text-white p-3 rounded-full hover:bg-[#006097] transition-colors"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors relative"
            aria-label="Copy link"
          >
            <FiCopy size={18} />
            {copied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Author Bio Component
  const AuthorBio = ({ author }: { author: Author }) => (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{author.name}</h3>
          {author.bio && <p className="text-gray-600">{author.bio}</p>}
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="text-center p-8"><PageSkeleton /></div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;
  if (!blog) return <div className="p-8">Blog post not found</div>;

  const author = getAuthorData(blog);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageLayout
      title={blog.BlogTitle}
      bgImageUrl={bgImageUrl}
      loading={false}
      error={null}
      isBlogPage={true}
    >
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {/* Cover Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {blog.coverBlog.map((image: ImageData) => (
            <div
              key={image.id}
              className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={getBestImageUrl(image)}
                alt={image.alternativeText || blog.BlogTitle || 'Blog image'}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ))}
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center text-sm md:text-base text-gray-600 mb-6 gap-2">
          <span className="font-medium text-[#073F27]">{blog.BlogDate}</span>
          <span className="text-gray-400">•</span>
          <span className="bg-[#073F27]/10 px-2 py-1 rounded-full text-[#073F27]">
            {blog.ReadTime}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{blog.TimeDuration}</span>
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
          {blog.BlogDesc.map((item, index) => {
            if (item.type === "heading") {
              const safeLevel = Math.min(Math.max(item.level, 1), 6);
              const HeadingTag = `h${safeLevel}` as HeadingTag;
              return (
                <HeadingTag
                  key={index}
                  id={`heading-${index}`}
                  className={`text-[#073F27] mb-6 border-b pb-2 border-gray-200/60 ${
                    safeLevel === 1 ? "text-4xl font-bold" :
                    safeLevel === 2 ? "text-3xl font-bold" :
                    safeLevel === 3 ? "text-2xl font-bold" :
                    safeLevel === 4 ? "text-xl font-bold" :
                    safeLevel === 5 ? "text-lg font-bold" : "text-base font-bold"
                  }`}
                >
                  {item.children.map((child, childIndex) => (
                    <span 
                      key={childIndex} 
                      className={`${child.bold ? "font-bold" : ""} ${child.italic ? "italic" : ""}`}
                    >
                      {child.text}
                    </span>
                  ))}
                </HeadingTag>
              );
            }

            if (item.type === "paragraph") {
              return (
                <div key={index} className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {item.children.map((child, childIndex) => (
                      <span 
                        key={childIndex} 
                        className={`hover:text-[#073F27]/90 transition-colors ${child.bold ? "font-bold" : ""} ${child.italic ? "italic" : ""}`}
                      >
                        {child.text}
                      </span>
                    ))}
                  </p>
                  {index % 3 === 0 && <div className="w-full h-px bg-gray-200/50 my-8"></div>}
                </div>
              );
            }
            return null;
          })}
        </article>

        {/* Social Sharing and Author */}
        <SocialSharingButtons title={blog.BlogTitle} url={currentUrl} />
        <AuthorBio author={author} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  BlogDate={post.BlogDate}
                  BlogTitle={post.BlogTitle}
                  BlogDesc={post.BlogDesc[0]?.children[0]?.text || "No description available"}
                  ReadTime={post.ReadTime || "Unknown"}
                  TimeDuration={post.TimeDuration || "Unknown"}
                  slug={post.slug}
                  coverBlog={post.coverBlog}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#073F27] hover:text-[#073F27]/80 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </div>

      <Footer />
    </PageLayout>
  );
}