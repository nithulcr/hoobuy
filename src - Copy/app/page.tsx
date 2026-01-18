import { Metadata, ResolvingMetadata } from 'next';
import HomePageClient from './components/HomePageClient';
import { getLatestProperties } from '../lib/getProperties';

// Define the Post interface
interface Post {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

// Function to fetch posts from WordPress
async function getPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_APPLICATION_PASSWORD}`).toString('base64'),
    },
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });

  if (!response.ok) {
    console.error('Failed to fetch posts:', response.status, await response.text());
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}


export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata: Metadata = {
    title: 'HOOBUY REALTORS',
    description: '',
    keywords: '',
  };

  return metadata;
}

export default async function HomePage() {
  const properties = await getLatestProperties();
  const posts: Post[] = await getPosts();
  return <HomePageClient properties={properties} posts={posts} />;
}
