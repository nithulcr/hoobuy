import Link from 'next/link';
import React from 'react';


import Hero2 from "../components/Hero2";

import Footer from '../components/Footer';
import Image from "next/image";
import AnimatedButton from "../components/AnimatedButton";



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


export default async function BlogListPage() {
  const posts: Post[] = await getPosts();

  return (
    <>
     
      <Hero2
        heading_en="Blogs"
        breadcrumbPosition="left"
      />
      <section className=" other-section pt-14 lg:pt-24 pb-14 lg:pb-24 overflow-hidden relative ">

        
        <div className='max-w-[1400px] mx-auto px-6'>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 fade-up">
            {posts.map((post) => {
              const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              if (!featuredImage) {
                console.warn(`Featured image not found for post: "${post.title.rendered}"`);
              }
              return (
                <div key={post.id} className="rounded-lg bg-white">
                  <Image 
                    src={featuredImage || '/blog1.png'}
                    alt="blog img"
                    width={400}
                    height={250}
                    className='w-full rounded-xl aspect-[2/1.2] object-cover'
                  />
                  <div className='p-5 pt-3'>
                    <span className='text-sm text-[var(--color)] fw-200'>
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <h2 className="text-2xl font-semibold my-3 line-clamp-3">
                      <Link href={`/blogs/${post.slug}`}>{post.title.rendered}</Link>
                    </h2>
                    <div
                      className="text-[#404040] font-normal line-clamp-5"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <AnimatedButton href={`/blogs/${post.slug}`} label="Read More" className="w-fit transparent-btn2 transparent-btn3 mt-6" />
                    
                  </div>
                </div>
              )
            })}
          </div>



        </div>
      </section>

      <Footer />
    </>

  );
}

