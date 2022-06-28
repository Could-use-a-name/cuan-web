import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from 'graphql-request';
import { graphcms } from '~/lib/graphcms.server';

const allPostsQuery = gql`
  {
    posts {
      title
      slug
      authors {
        name
        slug
      }
    }
  }
`;

export const loader: LoaderFunction = async () => {
  const preview = true;
  const API_TOKEN = preview
    ? process.env.GRAPHCMS_DEV_TOKEN
    : process.env.GRAPHCMS_PROD_TOKEN;

  const data = await graphcms.request(
    allPostsQuery,
    {},
    {
      authorization: `Bearer ${API_TOKEN}`,
    },
  );

  return json({
    posts: data.posts
  });
};

type Author = {
  name: string;
  slug: string;
}

type Post = {
  title: string;
  slug: string;
  authors: Author[];
}

type LoaderData = {
  posts: Post[];
}

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post: any, index: number) => (
        <a key={index} href={`/posts/${post.slug}`}>
          <h2>{post.title}</h2>
        </a>
      ))}
    </main>
  );
}