import '@/styles/prism.css';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { format } from 'date-fns';
import CustomLink from '@/components/CustomLink';
import TocSide from '@/containers/post/slug/TocSide';

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => (
    <CustomLink href={href as string}>{children}</CustomLink>
  ),
  // pre: ({ children }) => <Pre>{children}</Pre>,
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="relative">
      <article className="prose dark:prose-invert">
        <div className="mb-8 space-y-6">
          <h1 className="mb-2 text-5xl">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-gray-300">
            {format(new Date(post.date), 'yyyy-MM-dd')}
          </time>
        </div>
        <TocSide toc={post.toc} />
        <MDXContent components={mdxComponents} />
      </article>
    </div>
  );
}
