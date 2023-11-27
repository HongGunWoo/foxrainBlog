import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import Link from 'next/link';

export default function Posts() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div className="h-full w-full">
      {posts.map((post) => (
        <Link href={post.url} key={post._id}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}
