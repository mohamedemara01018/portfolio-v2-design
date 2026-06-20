/* eslint-disable @typescript-eslint/no-unused-vars */
import { blogService } from "@/services/blog.service";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import type { Metadata } from "next";
import ReadOnlyPost from "@/components/read-only-post/ReadOnlyPost";

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const response = await blogService.getBlogById(id);
        const blog = response?.data?.blog || response?.data || response;

        if (!blog || !blog.title) return { title: "Blog Post Not Found" };

        return {
            title: blog.title,
            description: blog.excerpt || blog.content?.substring(0, 160) || "Read this blog post on Mohamed Emara's portfolio.",
            openGraph: {
                title: blog.title,
                description: blog.excerpt || blog.content?.substring(0, 160),
                type: "article",
            },
        };
    } catch (error) {
        return { title: "Blog Post" };
    }
}

export default async function SingleBlogPage({ params }: Props) {
    const { id } = await params;
    let blog = null;

    try {
        const response = await blogService.getBlogById(id);
        blog = response?.data?.blog || response?.data || response;
        if (!blog || !blog.title) {
            blog = null;
        }
    } catch (error) {
        console.error("Error fetching single blog:", error);
    }

    if (!blog) {
        return (
            <main className="py-32 bg-(--portfolio-bg-secondary) min-h-screen">
                <div className="wrapper max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-foreground">Blog Post Not Found</h1>
                    <p className="mt-4 text-muted-foreground">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link href="/#blog" className="mt-8 inline-flex items-center gap-2 text-(--portfolio-accent) hover:underline">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="py-32 bg-(--portfolio-bg-secondary) min-h-screen">
            <div className="wrapper max-w-4xl mx-auto space-y-8">
                <Link href="/#blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-(--portfolio-accent) transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog List
                </Link>

                <article className="space-y-8 bg-card rounded-3xl overflow-hidden shadow-(color:--portfolio-shadow) border border-border">
                    <div className="relative w-full overflow-hidden">
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="p-8">
                                {blog.tags.map((tag: string, index: number) => (
                                    <span key={index} className="px-3 py-1 text-xs font-medium bg-(--portfolio-accent) text-white rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-8 sm:p-12 space-y-6">
                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                            <span className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                {blog.views || 0} views
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground focus:outline-none" tabIndex={0}>
                            {blog.title}
                        </h1>

                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            <ReadOnlyPost content={blog.content} />
                        </div>
                    </div>
                </article>
            </div>
        </main>
    )
}
