import type { LoaderFunction } from '@remix-run/node';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from 'graphql-request';
import { graphcms } from '~/lib/graphcms.server';

const PostQuery = gql`
  query Post($slug: String!) {
    post(where: {slug: $slug}) {
      title
      content {
        html
      }
    }
  }`
;

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const preview = true;
  const API_TOKEN = preview
    ? process.env.GRAPHCMS_DEV_TOKEN
    : process.env.GRAPHCMS_PROD_TOKEN;

  const data = await graphcms.request(
    PostQuery,
    {
      slug,
    },
    {
      authorization: `Bearer ${API_TOKEN}`,
    },
  );

  return json(data);
};

export default function Post () {
  const {post} = useLoaderData();

  return (
    <main dangerouslySetInnerHTML={{__html: post.content.html}}>
    </main>
  )
}