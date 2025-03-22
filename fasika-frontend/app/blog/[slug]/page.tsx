"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import PageLayout from "@/app/components/PageLayout/PageLayout";
import Footer from "@/app/components/footer/footer";
import { BlogData, ImageData } from "@/app/stores/blogStore";
import { PageSkeleton } from "@/app/components/skeletons/page-skeleton";

// Type definitions
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface BlogDescChild {
  type: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface BlogDescHeading {
  type: "heading";
  level: number;
  children: BlogDescChild[];
}

interface BlogDescParagraph {
  type: "paragraph";
  children: BlogDescChild[];
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bgImageUrl, setBgImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result); // Log the API response

        if (!result.data || result.data.length === 0) {
          throw new Error("Blog not found");
        }

        const blogData = result.data[0];
        setBlog(blogData);

        if (blogData.blogbg?.formats?.large?.url) {
          setBgImageUrl(
            `http://localhost:1337${blogData.blogbg.formats.large.url}`
          );
        }

        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div className="text-center p-8"><PageSkeleton /></div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="p-8">Blog post not found</div>;
  }

  // Social Sharing Buttons
  const SocialSharingButtons = ({ title, url }: { title: string, url: string }) => {
    const shareUrl = encodeURIComponent(url);
    const shareText = encodeURIComponent(title);

    return (
      <div className="flex space-x-4 mt-8">
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#1DA1F2]"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.037 9.037 0 01-2.86 1.09 4.507 4.507 0 00-7.677 4.11 12.8 12.8 0 01-9.29-4.71 4.507 4.507 0 001.394 6.015 4.48 4.48 0 01-2.04-.563v.057a4.507 4.507 0 003.616 4.415 4.52 4.52 0 01-2.034.077 4.507 4.507 0 004.21 3.13 9.038 9.038 0 01-5.6 1.93c-.364 0-.724-.021-1.08-.063a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.195-.004-.39-.013-.584a9.172 9.172 0 002.26-2.34z" />
          </svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#1877F2]"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#0077B5]"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.15 0-2.08-.94-2.08-2.08 0-1.15.94-2.08 2.08-2.08 1.15 0 2.08.94 2.08 2.08 0 1.15-.94 2.08-2.08 2.08zM7.13 20.45H3.56V9h3.57v11.45zM22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.97 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0z" />
          </svg>
        </a>
      </div>
    );
  };

  // Author Bio
  const AuthorBio = ({ author }: { author: any }) => {
    return (
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center space-x-4">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">{author.name}</h3>
            <p className="text-gray-600">{author.bio}</p>
          </div>
        </div>
      </div>
    );
  };

  // Related Posts
  const RelatedPosts = ({ posts }: { posts: any[] }) => {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={250}
                className="object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
                <a href={post.url} className="text-[#073F27] hover:text-[#073F27]/80 mt-4 inline-block">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
                src={`http://localhost:1337${image.formats.large.url}`}
                alt={image.alternativeText || blog.BlogTitle}
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
            // Render headings
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
                    safeLevel === 5 ? "text-lg font-bold" : 
                    "text-base font-bold"
                  }`}
                >
                  {item.children.map((child, childIndex) => {
                    let className = "";
                    if (child.bold) {
                      className += "font-bold ";
                    }
                    if (child.italic) {
                      className += "italic ";
                    }
                    return (
                      <span key={childIndex} className={className.trim()}>
                        {child.text}
                      </span>
                    );
                  })}
                </HeadingTag>
              );
            }

            // Render paragraphs
            if (item.type === "paragraph") {
              return (
                <div key={index} className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {item.children.map((child, childIndex) => {
                      let className = "hover:text-[#073F27]/90 transition-colors";
                      if (child.bold) {
                        className += " font-bold";
                      }
                      if (child.italic) {
                        className += " italic";
                      }
                      return (
                        <span key={childIndex} className={className}>
                          {child.text}
                        </span>
                      );
                    })}
                  </p>
                  {index % 3 === 0 && (
                    <div className="w-full h-px bg-gray-200/50 my-8"></div>
                  )}
                </div>
              );
            }

            // Handle unknown types
            return null;
          })}
        </article>

        {/* Social Sharing Buttons */}
        <SocialSharingButtons title={blog.BlogTitle} url={window.location.href} />

        {/* Author Bio */}
        <AuthorBio author={{
          name: "John Doe",
          bio: "John is a passionate writer and developer with over 10 years of experience in the tech industry.",
          avatarUrl: "/images/author-avatar.jpg", // Replace with your local image path
        }} />

        {/* Related Posts */}
        <RelatedPosts posts={[
          {
            title: "How to Build a Modern Blog",
            excerpt: "Learn how to create a modern blog with Next.js and Tailwind CSS.",
            imageUrl: "/images/blog-1.jpg", // Replace with your local image path
            url: "/blog/how-to-build-a-modern-blog",
          },
          {
            title: "Advanced React Techniques",
            excerpt: "Explore advanced React techniques to improve your development skills.",
            imageUrl: "/images/blog-2.jpg", // Replace with your local image path
            url: "/blog/advanced-react-techniques",
          },
        ]} />

        {/* Back Button */}
        <div className="mt-12">
          <a
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
          </a>
        </div>
      </div>

      <Footer />
    </PageLayout>
  );
}