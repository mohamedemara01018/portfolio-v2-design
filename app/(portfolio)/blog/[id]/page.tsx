import { blogService } from "@/services/blog.service";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import type { Metadata } from "next";

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
                images: [blog.coverImage || "/og-image.png"],
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
            <main className="py-32 bg-[color:var(--portfolio-bg-secondary)] min-h-screen">
                <div className="wrapper max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-foreground">Blog Post Not Found</h1>
                    <p className="mt-4 text-muted-foreground">The blog post you're looking for doesn't exist or has been removed.</p>
                    <Link href="/#blog" className="mt-8 inline-flex items-center gap-2 text-[color:var(--portfolio-accent)] hover:underline">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                </div>
            </main>
        );
    }

    const coverImageUrl = typeof blog.coverImage === 'string' ? blog.coverImage : "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1";

    return (
        <main className="py-32 bg-[color:var(--portfolio-bg-secondary)] min-h-screen">
            <div className="wrapper max-w-4xl mx-auto space-y-8">
                <Link href="/#blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[color:var(--portfolio-accent)] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog List
                </Link>

                <article className="space-y-8 bg-card rounded-3xl overflow-hidden shadow-[color:var(--portfolio-shadow)] border border-border">
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={coverImageUrl}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="absolute top-4 left-4 flex gap-2">
                                {JSON.parse(blog.tags[0]).map((tag: string, index: number) => (
                                    <span key={index} className="px-3 py-1 text-xs font-medium bg-[color:var(--portfolio-accent)] text-white rounded-full">
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
                            <div dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt || '' }} />
                        </div>
                    </div>
                </article>
            </div>
        </main>
    )
}
